require('dotenv').config();
const contentstack = require('@contentstack/management');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENT_TYPE_UID = 'product';
const HOMEPAGE_UID = 'homepage';

const client = contentstack.client();
const stack = client.stack({ api_key: API_KEY, management_token: MANAGEMENT_TOKEN });

// Track uploaded assets to avoid duplicates
const uploadedAssets = new Map();

/**
 * Download image from URL to temporary file
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

/**
 * Upload image to Contentstack assets
 */
async function uploadAsset(imageUrl, title, description = '') {
  // Check if already uploaded
  if (uploadedAssets.has(imageUrl)) {
    console.log(`   ♻️  Using cached asset for: ${title}`);
    return uploadedAssets.get(imageUrl);
  }

  try {
    // Handle local files (starting with /)
    if (imageUrl.startsWith('/')) {
      const localPath = path.join(__dirname, '..', 'public', imageUrl);
      
      if (!fs.existsSync(localPath)) {
        console.log(`   ⚠️  Local file not found: ${localPath}`);
        return null;
      }

      console.log(`   📤 Uploading local file: ${title}`);
      const asset = await stack.asset().create({
        upload: localPath,
        title: title,
        description: description || title,
      });

      uploadedAssets.set(imageUrl, asset);
      console.log(`   ✅ Uploaded: ${title} (UID: ${asset.uid})`);
      return asset;
    }

    // Handle external URLs
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      const tempDir = path.join(__dirname, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const filename = path.basename(new URL(imageUrl).pathname) || 'image.png';
      const tempPath = path.join(tempDir, filename);

      console.log(`   📥 Downloading: ${imageUrl}`);
      await downloadImage(imageUrl, tempPath);

      console.log(`   📤 Uploading to Contentstack: ${title}`);
      const asset = await stack.asset().create({
        upload: tempPath,
        title: title,
        description: description || title,
      });

      // Clean up temp file
      fs.unlinkSync(tempPath);

      uploadedAssets.set(imageUrl, asset);
      console.log(`   ✅ Uploaded: ${title} (UID: ${asset.uid})`);
      return asset;
    }

    console.log(`   ⚠️  Invalid image URL: ${imageUrl}`);
    return null;
  } catch (error) {
    console.error(`   ❌ Error uploading ${title}:`, error.message);
    return null;
  }
}

/**
 * Update product content type to use file fields for images
 */
async function updateProductContentType() {
  try {
    console.log('\n📋 Updating product content type...');
    
    const contentType = await stack.contentType(CONTENT_TYPE_UID).fetch();
    let schema = contentType.schema;

    // Update icon field (if exists) from text to file
    const iconFieldIndex = schema.findIndex(field => field.uid === 'icon');
    if (iconFieldIndex !== -1 && schema[iconFieldIndex].data_type === 'text') {
      console.log('   🔄 Converting icon field from text to file...');
      schema[iconFieldIndex] = {
        data_type: 'file',
        display_name: 'Icon',
        uid: 'icon',
        field_metadata: {
          description: 'Product icon or logo',
          rich_text_type: 'standard',
        },
        mandatory: false,
        multiple: false,
        unique: false,
      };
    } else if (iconFieldIndex === -1) {
      console.log('   ➕ Adding icon file field...');
      schema.push({
        data_type: 'file',
        display_name: 'Icon',
        uid: 'icon',
        field_metadata: {
          description: 'Product icon or logo',
        },
        mandatory: false,
        multiple: false,
        unique: false,
      });
    }

    // Update cicd_diagram_image field from text to file
    const cicdImageIndex = schema.findIndex(field => field.uid === 'cicd_diagram_image');
    if (cicdImageIndex !== -1 && schema[cicdImageIndex].data_type === 'text') {
      console.log('   🔄 Converting cicd_diagram_image field from text to file...');
      schema[cicdImageIndex] = {
        data_type: 'file',
        display_name: 'CI/CD Diagram Image',
        uid: 'cicd_diagram_image',
        field_metadata: {
          description: 'CI/CD pipeline diagram image',
        },
        mandatory: false,
        multiple: false,
        unique: false,
      };
    } else if (cicdImageIndex === -1) {
      console.log('   ➕ Adding cicd_diagram_image file field...');
      schema.push({
        data_type: 'file',
        display_name: 'CI/CD Diagram Image',
        uid: 'cicd_diagram_image',
        field_metadata: {
          description: 'CI/CD pipeline diagram image',
        },
        mandatory: false,
        multiple: false,
        unique: false,
      });
    }

    // Update architecture_diagrams group field to use file for imageUrl
    const archDiagramsIndex = schema.findIndex(field => field.uid === 'architecture_diagrams');
    if (archDiagramsIndex !== -1) {
      console.log('   🔄 Updating architecture_diagrams group field...');
      const imageUrlFieldIndex = schema[archDiagramsIndex].schema.findIndex(
        field => field.uid === 'image_url'
      );
      
      if (imageUrlFieldIndex !== -1 && schema[archDiagramsIndex].schema[imageUrlFieldIndex].data_type === 'text') {
        schema[archDiagramsIndex].schema[imageUrlFieldIndex] = {
          data_type: 'file',
          display_name: 'Diagram Image',
          uid: 'image_url',
          field_metadata: {
            description: 'Architecture diagram image',
          },
          mandatory: false,
          multiple: false,
          unique: false,
        };
      }
    }

    // Update team_members group field to use file for avatar
    const teamMembersIndex = schema.findIndex(field => field.uid === 'team_members');
    if (teamMembersIndex !== -1) {
      console.log('   🔄 Updating team_members group field...');
      const avatarFieldIndex = schema[teamMembersIndex].schema.findIndex(
        field => field.uid === 'avatar'
      );
      
      if (avatarFieldIndex !== -1 && schema[teamMembersIndex].schema[avatarFieldIndex].data_type === 'text') {
        schema[teamMembersIndex].schema[avatarFieldIndex] = {
          data_type: 'file',
          display_name: 'Avatar',
          uid: 'avatar',
          field_metadata: {
            description: 'Team member avatar image',
          },
          mandatory: false,
          multiple: false,
          unique: false,
        };
      }
    }

    // Update the content type
    contentType.schema = schema;
    await contentType.update();
    
    console.log('✅ Product content type updated successfully!');
  } catch (error) {
    console.error('❌ Error updating product content type:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Update homepage content type to use file fields for images
 */
async function updateHomepageContentType() {
  try {
    console.log('\n📋 Updating homepage content type...');
    
    const contentType = await stack.contentType(HOMEPAGE_UID).fetch();
    let schema = contentType.schema;

    // Update architecture_diagrams group field
    const archDiagramsIndex = schema.findIndex(field => field.uid === 'architecture_diagrams');
    if (archDiagramsIndex !== -1) {
      console.log('   🔄 Updating architecture_diagrams group field...');
      const imageUrlFieldIndex = schema[archDiagramsIndex].schema.findIndex(
        field => field.uid === 'image_url'
      );
      
      if (imageUrlFieldIndex !== -1 && schema[archDiagramsIndex].schema[imageUrlFieldIndex].data_type === 'text') {
        schema[archDiagramsIndex].schema[imageUrlFieldIndex] = {
          data_type: 'file',
          display_name: 'Diagram Image',
          uid: 'image_url',
          field_metadata: {
            description: 'Architecture diagram image',
          },
          mandatory: false,
          multiple: false,
          unique: false,
        };
      }
    }

    // Update the content type
    contentType.schema = schema;
    await contentType.update();
    
    console.log('✅ Homepage content type updated successfully!');
  } catch (error) {
    console.error('❌ Error updating homepage content type:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

/**
 * Update product entries to reference uploaded assets
 */
async function updateProductEntries() {
  try {
    console.log('\n📝 Fetching product entries...');
    const entries = await stack.contentType(CONTENT_TYPE_UID).entry().query().find();
    
    console.log(`Found ${entries.items.length} product entries\n`);

    for (const entry of entries.items) {
      console.log(`\n🔄 Processing: ${entry.title || entry.uid}`);
      let updated = false;
      const fullEntry = await stack.contentType(CONTENT_TYPE_UID).entry(entry.uid).fetch();

      // Upload and update icon
      if (fullEntry.icon && typeof fullEntry.icon === 'string') {
        console.log('   📸 Processing icon...');
        const asset = await uploadAsset(
          fullEntry.icon,
          `${fullEntry.title} - Icon`
        );
        if (asset) {
          fullEntry.icon = asset.uid;
          updated = true;
        }
      }

      // Upload and update CI/CD diagram image
      if (fullEntry.cicd_diagram_image && typeof fullEntry.cicd_diagram_image === 'string') {
        console.log('   📸 Processing CI/CD diagram...');
        const asset = await uploadAsset(
          fullEntry.cicd_diagram_image,
          `${fullEntry.title} - CI/CD Diagram`
        );
        if (asset) {
          fullEntry.cicd_diagram_image = asset.uid;
          updated = true;
        }
      }

      // Upload and update architecture diagrams
      if (fullEntry.architecture_diagrams && Array.isArray(fullEntry.architecture_diagrams)) {
        console.log('   📸 Processing architecture diagrams...');
        for (let i = 0; i < fullEntry.architecture_diagrams.length; i++) {
          const diagram = fullEntry.architecture_diagrams[i];
          if (diagram.image_url && typeof diagram.image_url === 'string') {
            const asset = await uploadAsset(
              diagram.image_url,
              `${fullEntry.title} - ${diagram.title || 'Architecture Diagram'}`
            );
            if (asset) {
              fullEntry.architecture_diagrams[i].image_url = asset.uid;
              updated = true;
            }
          }
        }
      }

      // Upload and update team member avatars
      if (fullEntry.team_members && Array.isArray(fullEntry.team_members)) {
        console.log('   📸 Processing team member avatars...');
        for (let i = 0; i < fullEntry.team_members.length; i++) {
          const member = fullEntry.team_members[i];
          if (member.avatar && typeof member.avatar === 'string') {
            const asset = await uploadAsset(
              member.avatar,
              `${member.name} - Avatar`,
              `Avatar for ${member.name}`
            );
            if (asset) {
              fullEntry.team_members[i].avatar = asset.uid;
              updated = true;
            }
          }
        }
      }

      // Update entry if changes were made
      if (updated) {
        console.log('   💾 Saving updated entry...');
        await fullEntry.update();
        console.log('   ✅ Entry updated successfully!');
      } else {
        console.log('   ⏭️  No images to update');
      }
    }

    console.log('\n✅ All product entries processed!');
  } catch (error) {
    console.error('❌ Error updating product entries:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

/**
 * Update homepage entry to reference uploaded assets
 */
async function updateHomepageEntry() {
  try {
    console.log('\n📝 Fetching homepage entry...');
    const entries = await stack.contentType(HOMEPAGE_UID).entry().query().find();
    
    if (entries.items.length === 0) {
      console.log('⚠️  No homepage entry found');
      return;
    }

    const entry = entries.items[0];
    console.log(`\n🔄 Processing homepage entry...`);
    let updated = false;
    const fullEntry = await stack.contentType(HOMEPAGE_UID).entry(entry.uid).fetch();

    // Upload and update architecture diagrams
    if (fullEntry.architecture_diagrams && Array.isArray(fullEntry.architecture_diagrams)) {
      console.log('   📸 Processing architecture diagrams...');
      for (let i = 0; i < fullEntry.architecture_diagrams.length; i++) {
        const diagram = fullEntry.architecture_diagrams[i];
        if (diagram.image_url && typeof diagram.image_url === 'string') {
          const asset = await uploadAsset(
            diagram.image_url,
            `Homepage - ${diagram.title || 'Architecture Diagram'}`
          );
          if (asset) {
            fullEntry.architecture_diagrams[i].image_url = asset.uid;
            updated = true;
          }
        }
      }
    }

    // Update entry if changes were made
    if (updated) {
      console.log('   💾 Saving updated entry...');
      await fullEntry.update();
      console.log('   ✅ Homepage entry updated successfully!');
    } else {
      console.log('   ⏭️  No images to update');
    }
  } catch (error) {
    console.error('❌ Error updating homepage entry:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting image migration to Contentstack assets...\n');
  console.log('This script will:');
  console.log('  1. Update content types to use file fields instead of text URLs');
  console.log('  2. Upload all images to Contentstack assets');
  console.log('  3. Update entries to reference the uploaded assets\n');

  try {
    // Step 1: Update content types
    await updateProductContentType();
    await updateHomepageContentType();

    // Step 2: Update entries (upload images and link assets)
    await updateProductEntries();
    await updateHomepageEntry();

    // Clean up temp directory
    const tempDir = path.join(__dirname, 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
      console.log('\n🧹 Cleaned up temporary files');
    }

    console.log('\n✅ Image migration completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   Total assets uploaded: ${uploadedAssets.size}`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Review the uploaded assets in Contentstack`);
    console.log(`   2. Update your frontend code to use asset URLs instead of string URLs`);
    console.log(`   3. Test the application to ensure images are displayed correctly`);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

main();

