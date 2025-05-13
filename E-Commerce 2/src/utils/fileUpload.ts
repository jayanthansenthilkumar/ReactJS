// Mock file upload service
// In a real application, this would integrate with a cloud storage service like AWS S3, Firebase Storage, etc.

/**
 * Uploads a file and returns a URL
 * @param file - The file to upload
 * @param path - The folder path to store the file (optional)
 * @returns Promise with the file URL
 */
export const uploadFile = async (file: File, path: string = 'images'): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Create a local URL for the file
      // In production, this would be a cloud storage URL
      
      // For demo purposes, we'll use random Unsplash images based on type
      let imageCategory = 'food';
      if (path.includes('shop')) {
        imageCategory = 'shop';
      } else if (path.includes('profile')) {
        imageCategory = 'person';
      }
      
      // Create random image URLs from Unsplash
      const timestamp = new Date().getTime();
      const randomId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://source.unsplash.com/random/300x300/?${imageCategory}&sig=${timestamp}${randomId}`;
      
      resolve(imageUrl);
    }, 1500);
  });
};

/**
 * Deletes a file by URL
 * @param url - The URL of the file to delete
 * @returns Promise indicating success
 */
export const deleteFile = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // In production, this would delete the file from cloud storage
      console.log(`Mock delete file: ${url}`);
      resolve(true);
    }, 800);
  });
};

export default {
  uploadFile,
  deleteFile
};