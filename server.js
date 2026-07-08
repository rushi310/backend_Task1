const cors = require('cors');
const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const blogs = [
    {
        id: 1,
        title: "Angular",
        author: "John Doe",
        content: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        category: "Frontend",
        tags: ["Angular", "TypeScript", "SPA"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 2,
        title: "JavaScript",
        author: "Jane Smith",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Programming",
        tags: ["JavaScript", "ES6", "Async"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 3,
        title: "CSS",
        author: "Emily Johnson",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Frontend",
        tags: ["CSS", "Flexbox", "Grid"],
        isPublished: false,
        createdAt: Date.now()
    },
    {
        id: 4,
        title: "React",
        author: "Michael Brown",
        content: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        category: "Frontend",
        tags: ["Angular", "RxJS"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 5,
        title: "Next.js",
        author: "David Wilson",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Programming",
        tags: ["Closures", "Promises", "Fetch API"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 6,
        title: "Docker",
        author: "Sarah Lee",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Frontend",
        tags: ["Animations", "Responsive Design"],
        isPublished: false,
        createdAt: Date.now()
    }
];

app.get('/blogs', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching blogs"
        });
    }
});

app.get('/blogs/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        const blog = blogs.find(blog => blog.id === id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `The blog with ID ${id} was not found`
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching blog"
        });
    }
});

app.post('/blogs', (req, res) => {
    try {
        const {
            title,
            content,
            author,
            category,
            tags,
            isPublished
        } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const newBlog = {
            id: Date.now(),
            title,
            content,
            author,
            category,
            tags,
            isPublished,
            createdAt: Date.now(),
            updatedAt: null
        };

        blogs.unshift(newBlog);

        res.status(201).json({
            success: true,
            data: newBlog,
            message: `The blog with ID ${newBlog.id} was created successfully`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating blog"
        });
    }
});

app.patch('/blogs/:id', (req, res) => {
    try {
        const blogId = Number(req.params.id);

        const blogIndex = blogs.findIndex(blog => blog.id === blogId);

        if (blogIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blog with ID ${blogId} was not found`
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update"
            });
        }

        const updatedBlog = {
            ...blogs[blogIndex],
            ...req.body,
            id: blogs[blogIndex].id,
            createdAt: blogs[blogIndex].createdAt,
            updatedAt: Date.now()
        };

        blogs[blogIndex] = updatedBlog;

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating blog"
        });
    }
});

app.delete('/blogs/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        const blogIndex = blogs.findIndex(blog => blog.id === id);

        if (blogIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blog with ID ${id} was not found`
            });
        }

        const deletedBlog = blogs.splice(blogIndex, 1)[0];

        res.status(200).json({
            success: true,
            data: deletedBlog,
            message: `The blog with ID ${id} was deleted successfully`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting blog"
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API is running"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});