import React from 'react';
import { NEWS_ITEMS } from '../../services/mockData';
import { Calendar, ArrowRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 id="news-heading" className="text-3xl font-extrabold text-gray-900">Latest News & Events</h2>
            <p className="mt-2 text-gray-600">Stay updated with what's happening on campus.</p>
          </div>
          <a href="#" className="text-indigo-700 font-medium hover:text-indigo-800 flex items-center gap-1 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded p-1">
            View all news <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" aria-hidden="true" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full 
                    ${item.category === 'Alert' ? 'bg-red-100 text-red-800' : 
                      item.category === 'Event' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4 flex-1">{item.summary}</p>
                <button 
                  className="text-indigo-700 font-bold text-sm hover:underline self-start focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
                  aria-label={`Read more about ${item.title}`}
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
           <a href="#" className="text-indigo-700 font-bold hover:text-indigo-800 inline-flex items-center gap-1 p-2">
            View all news <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};