import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const AnnouncementModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Block Specific');
  const [block, setBlock] = useState('');
  const [isBlockDropdownOpen, setIsBlockDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  
  const blockOptions = ['Block A', 'Block B', 'Block C', 'Block D'];
  const typeOptions = ['Block Specific', 'All Blocks', 'Staff Only'];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      type,
      ...(type === 'Block Specific' && { block }),
    });
  };

  const toggleBlockDropdown = () => {
    setIsBlockDropdownOpen(!isBlockDropdownOpen);
  };

  const toggleTypeDropdown = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
  };

  const selectBlock = (selectedBlock) => {
    setBlock(selectedBlock);
    setIsBlockDropdownOpen(false);
  };

  const selectType = (selectedType) => {
    setType(selectedType);
    setIsTypeDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Create New Announcement</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-announcement"
                  required
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter announcement content"
                  rows={5}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-announcement resize-none"
                  required
                />
              </div>

              {/* Type Dropdown */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center border rounded-md px-4 py-2 bg-white"
                    onClick={toggleTypeDropdown}
                  >
                    <span>{type}</span>
                    <svg 
                      className={cn("w-4 h-4 transition-transform", isTypeDropdownOpen ? "transform rotate-180" : "")} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isTypeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {typeOptions.map((option) => (
                          <li 
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectType(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional Block Dropdown */}
              {type === 'Block Specific' && (
                <div>
                  <label htmlFor="block" className="block text-sm font-medium text-gray-700 mb-1">
                    Block
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex justify-between items-center border rounded-md px-4 py-2 bg-white"
                      onClick={toggleBlockDropdown}
                    >
                      <span>{block || 'Select block'}</span>
                      <svg 
                        className={cn("w-4 h-4 transition-transform", isBlockDropdownOpen ? "transform rotate-180" : "")} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isBlockDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                        <ul className="py-1 max-h-60 overflow-auto">
                          {blockOptions.map((option) => (
                            <li 
                              key={option}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => selectBlock(option)}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                   variant="outline"
                  className="bg-announcement hover:bg-announcement-dark"
                  disabled={!title || !content || (type === 'Block Specific' && !block)}
                >
                  Create Announcement
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
