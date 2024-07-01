"use server";
import fs from 'fs/promises';
import path from 'path';

export async function addProduct(formData: FormData) {
  const formDataEntries = Array.from(formData.entries());

  // Extract the fields from FormData
  const productData: any = {};
  let fileBuffer = null;
  let fileName = '';

  // Use a loop to handle formData entries
  for (const [key, value] of formDataEntries) {
    if (key === 'picture' && value instanceof Blob) {
      fileBuffer = Buffer.from(await value.arrayBuffer());
      fileName = value.name;
    } else {
      productData[key] = value;
    }
  }

  if (!fileBuffer) {
    throw new Error('No file uploaded');
  }

  // Create the uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  // Define the file path
  const filePath = path.join(uploadDir, fileName);

  // Write the file to disk
  try {
    await fs.writeFile(filePath, fileBuffer);
    console.log('File saved successfully');
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }

  // Perform any other logic (e.g., save product data to a database)

  return { message: 'Product added successfully' };
}
