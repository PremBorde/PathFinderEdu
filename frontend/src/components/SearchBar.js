import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaTimes, 
  FaGraduationCap, 
  FaBriefcase, 
  FaBook, 
  FaUniversity,
  FaArrowRight,
  FaClock
} from 'react-icons/fa';
import { searchInData } from '../data/searchData';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border-radius: 25px;
  border: 2px solid ${props => props.focused ? '#4299e1' : '#e2e8f0'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.focused ? '0 0 0 3px rgba(66, 153, 225, 0.1)' : '0 2px 4px rgba(0,0,0,0.1)'};

  &:hover {
    border-color: #4299e1;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 60px 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  background: transparent;
  outline: none;
  color: #2d3748;

  &::placeholder {
    color: #a0aec0;
    font-weight: 400;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #4299e1;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3182ce;
    transform: translateY(-50%) scale(1.05);
  }

  svg {
    font-size: 14px;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 55px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    color: #e53e3e;
    background: rgba(229, 62, 62, 0.1);
  }

  svg {
    font-size: 14px;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 8px;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.show ? '0' : '-10px'});
  transition: all 0.3s ease;
`;

const SearchSection = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f7fafc;

  &:last-child {
    border-bottom: none;
  }

  h4 {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      font-size: 10px;
    }
  }
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    transform: translateX(4px);
  }

  .icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    min-width: 0;

    .title {
      font-size: 14px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtitle {
      font-size: 12px;
      color: #718096;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .arrow {
    color: #a0aec0;
    font-size: 12px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover .arrow {
    opacity: 1;
    transform: translateX(2px);
  }
`;

const NoResults = styled.div`
  padding: 30px 20px;
  text-align: center;
  color: #718096;

  .icon {
    font-size: 32px;
    color: #e2e8f0;
    margin-bottom: 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 14px;
  }
`;

const QuickActions = styled.div`
  padding: 15px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;

  h4 {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .action {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 12px;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #4299e1;
      color: white;
      border-color: #4299e1;
    }
  }
`;

const RecentSearches = styled.div`
  .recent-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    cursor: pointer;
    color: #718096;
    font-size: 13px;
    transition: all 0.2s ease;

    &:hover {
      color: #4299e1;
    }

    svg {
      font-size: 12px;
    }
  }
`;

const SearchBar = ({ placeholder = "Search careers, courses, colleges...", onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();



  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Use comprehensive search function
    const filtered = searchInData(searchQuery);
    setResults(filtered);

    // Add to recent searches
    const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Call parent onSearch if provided
    if (onSearch) {
      onSearch(searchQuery, filtered);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      handleSearch(value);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(focused);
    }
  };

  const handleResultClick = (result) => {
    setQuery(result.title);
    setShowDropdown(false);
    navigate(result.path);
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setFocused(true);
    setShowDropdown(true);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'career': return FaBriefcase;
      case 'stream': return FaGraduationCap;
      case 'course': return FaBook;
      case 'college': return FaUniversity;
      default: return FaSearch;
    }
  };

  const getCategoryTitle = (type) => {
    switch (type) {
      case 'career': return 'Careers';
      case 'stream': return 'Streams';
      case 'course': return 'Courses';
      case 'college': return 'Colleges';
      default: return 'Results';
    }
  };

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {});

  return (
    <SearchContainer ref={searchRef} expanded={focused || query} className={className}>
      <SearchInputWrapper focused={focused}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
        />
        {query && (
          <ClearButton onClick={handleClear}>
            <FaTimes />
          </ClearButton>
        )}
        <SearchButton onClick={() => handleSearch()}>
          <FaSearch />
        </SearchButton>
      </SearchInputWrapper>

      <SearchDropdown show={showDropdown}>
        {query && results.length > 0 && (
          <>
            {Object.entries(groupedResults).map(([type, items]) => {
              const IconComponent = getIcon(type);
              return (
                <SearchSection key={type}>
                  <h4>
                    <IconComponent />
                    {getCategoryTitle(type)}
                  </h4>
                  {items.slice(0, 4).map(result => (
                    <SearchResult key={result.id} onClick={() => handleResultClick(result)}>
                      <div className="icon" style={{ background: result.icon }}>
                        <IconComponent />
                      </div>
                      <div className="content">
                        <div className="title">{result.title}</div>
                        <div className="subtitle">{result.subtitle}</div>
                      </div>
                      <FaArrowRight className="arrow" />
                    </SearchResult>
                  ))}
                </SearchSection>
              );
            })}
          </>
        )}

        {query && results.length === 0 && (
          <NoResults>
            <div className="icon">
              <FaSearch />
            </div>
            <div className="title">No results found</div>
            <div className="subtitle">Try searching for careers, courses, or colleges</div>
          </NoResults>
        )}

        {!query && recentSearches.length > 0 && (
          <SearchSection>
            <h4>
              <FaClock />
              Recent Searches
            </h4>
            <RecentSearches>
              {recentSearches.map((search, index) => (
                <div key={index} className="recent-item" onClick={() => handleRecentSearchClick(search)}>
                  <FaClock />
                  {search}
                </div>
              ))}
            </RecentSearches>
          </SearchSection>
        )}

        {!query && (
          <QuickActions>
            <h4>Quick Actions</h4>
            <div className="actions">
              <div className="action" onClick={() => navigate('/assessment')}>Take Assessment</div>
              <div className="action" onClick={() => navigate('/streams')}>Explore Streams</div>
              <div className="action" onClick={() => navigate('/science')}>Engineering Careers</div>
              <div className="action" onClick={() => navigate('/commerce')}>Business Careers</div>
              <div className="action" onClick={() => navigate('/arts')}>Creative Careers</div>
            </div>
          </QuickActions>
        )}
      </SearchDropdown>
    </SearchContainer>
  );
};

export default SearchBar;
