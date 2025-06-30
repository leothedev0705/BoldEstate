import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock blog post data - in real app, this would come from API
  const mockPost = {
    id: 1,
    slug: 'real-estate-market-trends-2024',
    title: '2024 Real Estate Market Trends: What Buyers and Sellers Need to Know',
    excerpt: 'Explore the latest market trends shaping the real estate landscape in 2024, including pricing patterns, inventory levels, and emerging opportunities.',
    content: `
      <p>The real estate market in 2024 is experiencing significant shifts that both buyers and sellers need to understand. With changing economic conditions, evolving buyer preferences, and new technological innovations, the landscape is more dynamic than ever.</p>

      <h2>Key Market Trends</h2>
      
      <h3>1. Price Stabilization in Major Markets</h3>
      <p>After years of rapid price appreciation, many major metropolitan areas are seeing a stabilization in home prices. This doesn't mean prices are falling dramatically, but rather that the rate of increase has slowed considerably. Cities like San Francisco, New York, and Los Angeles are showing signs of market balance returning.</p>

      <h3>2. Inventory Levels Improving</h3>
      <p>One of the biggest challenges in recent years has been low inventory levels. However, 2024 is showing promising signs of improvement. More homeowners are deciding to sell, creating opportunities for buyers who have been waiting on the sidelines.</p>

      <h3>3. Interest Rate Adaptation</h3>
      <p>While interest rates remain higher than the historic lows of 2020-2021, both buyers and sellers are adapting to the new normal. Creative financing solutions and seller concessions are becoming more common as market participants find ways to make deals work.</p>

      <h2>What This Means for Buyers</h2>
      
      <ul>
        <li><strong>More Options:</strong> Increased inventory means buyers have more properties to choose from and can be more selective.</li>
        <li><strong>Negotiation Power:</strong> With less competition, buyers often have more room to negotiate on price and terms.</li>
        <li><strong>Time to Research:</strong> The frantic pace of 2021-2022 has slowed, giving buyers time to make informed decisions.</li>
      </ul>

      <h2>What This Means for Sellers</h2>
      
      <ul>
        <li><strong>Realistic Pricing:</strong> Properties need to be priced competitively from the start to attract serious buyers.</li>
        <li><strong>Home Preparation:</strong> With more competition, homes need to be in excellent condition to stand out.</li>
        <li><strong>Marketing Strategy:</strong> Professional photography, staging, and online presence are more important than ever.</li>
      </ul>

      <h2>Regional Variations</h2>
      
      <p>It's important to note that real estate is inherently local. While national trends provide context, specific markets can vary significantly. Some areas are still experiencing strong seller's markets, while others have shifted to favor buyers.</p>

      <h3>Hot Markets to Watch</h3>
      <p>Certain markets continue to show strong performance, driven by factors like job growth, population migration, and limited land availability. These include parts of Texas, Florida, and select secondary cities that have benefited from remote work trends.</p>

      <h2>Looking Ahead</h2>
      
      <p>The remainder of 2024 is expected to bring continued stabilization, with the possibility of more buyer-friendly conditions in certain markets. Both buyers and sellers should work with experienced real estate professionals who understand local market dynamics and can provide personalized guidance.</p>

      <p>Whether you're buying or selling, the key is to focus on your personal situation rather than trying to time the market perfectly. Real estate remains a strong long-term investment, and the right property at the right price is always a good decision.</p>
    `,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    authorBio: 'Sarah is a senior real estate agent with over 8 years of experience in luxury and waterfront properties.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Market Trends',
    tags: ['Market Analysis', 'Real Estate Trends', '2024 Forecast', 'Buying Tips', 'Selling Tips']
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPost(mockPost);
      setLoading(false);
    }, 1000);
  }, [slug]);

  const shareUrl = `${window.location.origin}/blog/${slug}`;

  const socialShare = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      {/* Back Button */}
      <div className="container-width px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className="bg-primary-400 text-gray-950 px-4 py-2 rounded-xl font-bold text-sm">
            <Tag className="h-4 w-4 inline mr-2" />
            {post.category}
          </span>
        </div>

        {/* Share Buttons */}
        <div className="absolute top-8 right-8 flex space-x-2">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-gray-400" />
            {socialShare.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors ${social.color}`}
                aria-label={`Share on ${social.name}`}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container-width">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <motion.header
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-black mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Article Body */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              '--tw-prose-body': '#d1d5db',
              '--tw-prose-headings': '#ffffff',
              '--tw-prose-lead': '#9ca3af',
              '--tw-prose-links': '#00eaff',
              '--tw-prose-bold': '#ffffff',
              '--tw-prose-counters': '#9ca3af',
              '--tw-prose-bullets': '#374151',
              '--tw-prose-hr': '#374151',
              '--tw-prose-quotes': '#9ca3af',
              '--tw-prose-quote-borders': '#374151',
              '--tw-prose-captions': '#9ca3af',
              '--tw-prose-code': '#00eaff',
              '--tw-prose-pre-code': '#d1d5db',
              '--tw-prose-pre-bg': '#1f2937',
              '--tw-prose-th-borders': '#374151',
              '--tw-prose-td-borders': '#374151'
            }}
          />

          {/* Tags */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-lg font-heading font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-xl text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card border-t border-gray-800 pt-8"
          >
            <div className="flex items-start space-x-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold mb-2">About {post.author}</h3>
                <p className="text-gray-400 mb-4">{post.authorBio}</p>
                <div className="flex space-x-4">
                  {socialShare.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 transition-colors ${social.color}`}
                      aria-label={`Follow on ${social.name}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Articles CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-heading font-bold mb-4">
              Want to Read More Insights?
            </h3>
            <p className="text-gray-400 mb-8">
              Explore our blog for more real estate tips, market analysis, and expert advice.
            </p>
            <Link to="/blog" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Articles</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPost; 