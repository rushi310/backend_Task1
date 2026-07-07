

const port = 4000;
const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors());
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
        title: "Angular",
        author: "Michael Brown",
        content: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        category: "Frontend",
        tags: ["Angular", "RxJS"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 5,
        title: "JavaScript",
        author: "David Wilson",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Programming",
        tags: ["Closures", "Promises", "Fetch API"],
        isPublished: true,
        createdAt: Date.now()
    },
    {
        id: 6,
        title: "CSS",
        author: "Sarah Lee",
        content: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        category: "Frontend",
        tags: ["Animations", "Responsive Design"],
        isPublished: false,
        createdAt: Date.now()
    },
];

app.use(express.json())
app.get('/blogs', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: blogs
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in fetching blogs`
        })
    }
})

app.get("/blogs/:id", (req, res) => {
    try {
        let id = Number(req.params.id);
        let blog = blogs.find(p => p.id === id)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `The blog with id ${id}is Not Found`
            })
        }
        res.status(200).json({
            success: true,
            data: blog
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `error fetch blog.`
        })
    }
})

app.post('/blogs', (req, res) => {
    try {
        let { title, content, author } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title & content are required'
            })
        }
        let newBlog = {
            title: title,
            content: content,
            author: author,
            id: Date.now(),
            createdAt: Date.now(),
            updatedAt: null
        }
        blogs.unshift(newBlog)
        res.status(201).json({
            success: true,
            data: newBlog,
            message: `The blog with id ${newBlog.id} created successfully`
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `error while creating blog.`
        })
    }
})

app.patch('/blogs/:id', (req, res) => {
    try {
        // Get blog ID from URL
        const blogId = Number(req.params.id);

        // Find blog index
        const blogIndex = blogs.findIndex(blog => blog.id === blogId);

        // Check if blog exists
        if (blogIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blog with ID ${blogId} not found.`
            });
        }

        // Get updated data
        const { title, content, author } = req.body;

        // Validate (optional - see note below)
        if (!title && !content && !author) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }

        // Create updated object
        const updatedBlog = {
            ...blogs[blogIndex],
            ...req.body,
            updatedAt: Date.now()
        };

        // Replace old blog
        blogs[blogIndex] = updatedBlog;

        // Send response
        res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
            data: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating blog.",
            error: error.message
        });
    }
});

app.delete('/blogs/:id', (req, res) => {
    try {
        let id = req.params.id;
        let getIndex = blogs.findIndex(b => b.id == id)

        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `blog with id ${id} not Found.`
            })
        }

        blogs.splice(getIndex, 1);

        res.status(200).json({
            success: true,
            data: blogs,
            message: `blog with id ${id} deleted successfully`
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `error while deleting message..`
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:4000`);
})
