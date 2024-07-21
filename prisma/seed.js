const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const updateBlogDates = async () => {
  try {
    await db.blog.updateMany({
      where: {
        date: null
      },
      data: {
        date: new Date()
      }
    });
    console.log("Successfully updated blogs with null date fields.");
  } catch (error) {
    console.error("Error updating blogs:", error);
  } finally {
    await db.$disconnect();
  }
};

// Call the function to update blog dates
updateBlogDates();
