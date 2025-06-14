import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'Chennai, Tamil Nadu',
    'Coimbatore, Tamil Nadu',
    'Madurai, Tamil Nadu',
    'Tiruchirappalli, Tamil Nadu',
    'Salem, Tamil Nadu',
    'Tirunelveli, Tamil Nadu',
    'Erode, Tamil Nadu',
    'Vellore, Tamil Nadu',
    'Thoothukudi, Tamil Nadu',
    'Dindigul, Tamil Nadu',
    'Thanjavur, Tamil Nadu',
    'Kanchipuram, Tamil Nadu'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearch(suggestion);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for a city in Tamil Nadu..."
            className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-lg text-white placeholder-white font-semibold rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 shadow-lg"
          />
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/40 overflow-hidden z-50 shadow-2xl">
          {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-all duration-200 flex items-center space-x-3 border-b border-white/30 last:border-b-0 font-semibold"
            >
              <MapPin className="w-4 h-4 text-white" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;