import React from "react";
import { assets } from "../../assets/assets";
import "./Blog.css";

const blogPosts = [
  {
    title: "How to Prepare for University Admission Exams",
    image: assets.saleImgOne,
    excerpt: "Discover the best strategies and resources to ace your university admission tests. Tips, tricks, and more!",
    date: "June 1, 2024",
    author: "Admin",
  },
  {
    title: "Top 5 Study Habits for Success",
    image: assets.saleImgTwo,
    excerpt: "Build habits that lead to academic excellence. Learn what top students do differently!",
    date: "May 20, 2024",
    author: "Joykoly Team",
  },
  {
    title: "Balancing Study and Life",
    image: assets.saleImgThree,
    excerpt: "Tips on how to maintain a healthy balance between your studies and personal life.",
    date: "May 10, 2024",
    author: "Guest Writer",
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1>Latest Blog Articles</h1>
        <p>Read our latest tips, guides, and updates to help you succeed in your academic journey!</p>
      </div>
      <div className="blog-list">
        {blogPosts.map((post, idx) => (
          <div className="blog-card" key={idx}>
            <img src={post.image} alt={post.title} className="blog-card-img" />
            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-meta">
                <span>{post.date}</span> | <span>{post.author}</span>
              </div>
              <button className="blog-read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;