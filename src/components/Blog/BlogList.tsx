import React from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
}

const BlogList: React.FC = () => {
  // 这里是示例数据，实际应用中您可能需要从 API 获取数据
  const blogs: BlogPost[] = [
    {
      id: 1,
      title: '5 个提高编程效率的技巧',
      excerpt: '学习这些技巧可以帮助你更快地编写高质量代码...',
    },
    {
      id: 2,
      title: 'React 18 新特性解析',
      excerpt: 'React 18 带来了许多激动人心的新功能，让我们一起来看看...',
    },
    {
      id: 3,
      title: '如何优化你的 TypeScript 代码',
      excerpt: '这篇文章将介绍一些实用的 TypeScript 优化技巧...',
    },
    {
      id: 4,
      title: '深入理解 JavaScript 异步编程',
      excerpt: '异步编程是 JavaScript 的重要特性，本文将深入探讨...',
    },
    {
      id: 5,
      title: 'CSS Grid 布局完全指南',
      excerpt: 'CSS Grid 是一个强大的布局工具，让我们来学习如何使用它...',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">最新博客文章</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{blog.excerpt}</p>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            阅读更多
          </a>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
