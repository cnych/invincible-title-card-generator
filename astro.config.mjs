// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress'; // 注意：需要安装这个依赖

// https://astro.build/config
export default defineConfig({
  // 设置站点 URL（部署时应替换为实际域名）
  site: 'https://www.invincibletitlecardgenerator.com',

  trailingSlash: 'never',
  
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      // 排除不需要包含在sitemap中的页面
      filter: (page) => !page.includes('/admin/') && !page.includes('/draft/'),
      // 添加自定义链接
      customPages: [
        'https://www.invincibletitlecardgenerator.com/terms',
        'https://www.invincibletitlecardgenerator.com/privacy',
      ],
      // 设置默认的changefreq和priority值
      changefreq: 'weekly',
      priority: 0.8,
      // 添加最后修改日期
      lastmod: new Date(),
    }),
    // 添加压缩插件，提高网站性能（对SEO有帮助）
    compress({
      CSS: true,
    }),
  ],
  
  // 启用构建时的性能优化
  build: {
    inlineStylesheets: 'auto', // 内联小型样式表以减少HTTP请求
  }
});