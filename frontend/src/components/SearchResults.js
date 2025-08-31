import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaBriefcase, 
  FaGraduationCap, 
  FaBook, 
  FaUniversity,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaTags
} from 'react-icons/fa';
import SearchBar from './SearchBar';
import { searchInData, getAllSearchData } from '../data/searchData';

const SearchResultsContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 80px;
`;

const SearchHeader = styled.div`
  background: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const SearchHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SearchTitle = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchSubtitle = styled.p`
  color: #718096;
  margin-bottom: 2rem;
  font-size: 1.1rem;

  .highlight {
    color: #4299e1;
    font-weight: 600;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#4299e1' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#3182ce' : '#f7fafc'};
    border-color: ${props => props.active ? '#3182ce' : '#cbd5e0'};
  }

  svg {
    font-size: 0.8rem;
  }
`;

const SortDropdown = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 25px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #4299e1;
  }
`;

const ResultsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  @media (max-width: 968px) {
    display: none;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #4299e1;
      font-size: 0.9rem;
    }
  }
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.9rem;
  color: #4a5568;
  transition: all 0.2s ease;

  &:hover {
    color: #2d3748;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #4299e1;
  }

  .count {
    color: #a0aec0;
    font-size: 0.8rem;
    margin-left: auto;
  }
`;

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #f7fafc;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    border-color: #4299e1;
  }

  .header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  .subtitle {
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    font-size: 0.85rem;
    color: #a0aec0;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      font-size: 0.8rem;
    }
  }

  .description {
    color: #4a5568;
    line-height: 1.5;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .tag {
    background: #f7fafc;
    color: #4a5568;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .footer {
    display: flex;
    justify-content: between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #f7fafc;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #ed8936;
    font-size: 0.85rem;
    font-weight: 500;

    svg {
      font-size: 0.8rem;
    }
  }

  .action {
    color: #4299e1;
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    transition: all 0.2s ease;

    svg {
      font-size: 0.8rem;
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(2px);
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  .icon {
    font-size: 4rem;
    color: #e2e8f0;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #718096;
    margin-bottom: 2rem;
  }

  .suggestions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .suggestion {
    background: #4299e1;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #3182ce;
      transform: translateY(-1px);
    }
  }
`;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: 'all',
    category: [],
    duration: [],
    rating: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState([]);

  const query = searchParams.get('q') || '';

  // Get comprehensive search data
  const allResults = getAllSearchData();

  useEffect(() => {
    // Use comprehensive search function
    let filtered = query ? searchInData(query, filters) : allResults;

    // Apply additional filters if not already applied in search
    if (!query) {
      if (filters.type !== 'all') {
        filtered = filtered.filter(item => item.type === filters.type);
      }

      if (filters.category.length > 0) {
        filtered = filtered.filter(item => filters.category.includes(item.category));
      }
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setResults(filtered);
  }, [query, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'type') {
        return { ...prev, type: value };
      } else if (filterType === 'category') {
        const newCategories = prev.category.includes(value)
          ? prev.category.filter(c => c !== value)
          : [...prev.category, value];
        return { ...prev, category: newCategories };
      }
      return prev;
    });
  };

  const handleResultClick = (result) => {
    navigate(result.path);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'career': return FaBriefcase;
      case 'course': return FaBook;
      case 'college': return FaUniversity;
      default: return FaGraduationCap;
    }
  };

  return (
    <SearchResultsContainer>
      <SearchHeader>
        <SearchHeaderContent>
          <SearchTitle>
            {query ? `Search Results for "${query}"` : 'Explore Careers & Courses'}
          </SearchTitle>
          <SearchSubtitle>
            Found <span className="highlight">{results.length}</span> results
            {query && ` for "${query}"`}
          </SearchSubtitle>
          
          <SearchBar 
            placeholder="Search careers, courses, colleges..."
            onSearch={(searchQuery) => {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }}
          />
        </SearchHeaderContent>
      </SearchHeader>

      <ResultsContent>
        <Sidebar>
          <SidebarSection>
            <h3>
              <FaFilter />
              Filter by Type
            </h3>
            <FilterOption>
              <input
                type="radio"
                name="type"
                checked={filters.type === 'all'}
                onChange={() => handleFilterChange('type', 'all')}
              />
              All Results
              <span className="count">{allResults.length}</span>
            </FilterOption>
            <FilterOption>
              <input
                type="radio"
                name="type"
                checked={filters.type === 'career'}
                onChange={() => handleFilterChange('type', 'career')}
              />
              Careers
              <span className="count">{allResults.filter(r => r.type === 'career').length}</span>
            </FilterOption>
            <FilterOption>
              <input
                type="radio"
                name="type"
                checked={filters.type === 'course'}
                onChange={() => handleFilterChange('type', 'course')}
              />
              Courses
              <span className="count">{allResults.filter(r => r.type === 'course').length}</span>
            </FilterOption>
            <FilterOption>
              <input
                type="radio"
                name="type"
                checked={filters.type === 'college'}
                onChange={() => handleFilterChange('type', 'college')}
              />
              Colleges
              <span className="count">{allResults.filter(r => r.type === 'college').length}</span>
            </FilterOption>
          </SidebarSection>

          <SidebarSection>
            <h3>
              <FaTags />
              Category
            </h3>
            {['Engineering', 'Commerce', 'Science', 'Arts', 'Medical'].map(category => (
              <FilterOption key={category}>
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => handleFilterChange('category', category)}
                />
                {category}
                <span className="count">
                  {allResults.filter(r => r.category === category).length}
                </span>
              </FilterOption>
            ))}
          </SidebarSection>
        </Sidebar>

        <ResultsGrid>
          <SearchFilters>
            <FilterButton 
              active={filters.type === 'all'}
              onClick={() => handleFilterChange('type', 'all')}
            >
              <FaSearch />
              All ({results.length})
            </FilterButton>
            <FilterButton 
              active={filters.type === 'career'}
              onClick={() => handleFilterChange('type', 'career')}
            >
              <FaBriefcase />
              Careers
            </FilterButton>
            <FilterButton 
              active={filters.type === 'course'}
              onClick={() => handleFilterChange('type', 'course')}
            >
              <FaBook />
              Courses
            </FilterButton>
            <FilterButton 
              active={filters.type === 'college'}
              onClick={() => handleFilterChange('type', 'college')}
            >
              <FaUniversity />
              Colleges
            </FilterButton>
            
            <SortDropdown value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Name</option>
            </SortDropdown>
          </SearchFilters>

          {results.length > 0 ? (
            results.map(result => {
              const IconComponent = getIcon(result.type);
              return (
                <ResultCard key={result.id} onClick={() => handleResultClick(result)}>
                  <div className="header">
                    <div className="icon" style={{ background: result.icon }}>
                      <IconComponent />
                    </div>
                    <div className="content">
                      <div className="title">{result.title}</div>
                      <div className="subtitle">{result.subtitle}</div>
                      <div className="meta">
                        {result.location && (
                          <div className="meta-item">
                            <FaMapMarkerAlt />
                            {result.location}
                          </div>
                        )}
                        {result.duration && (
                          <div className="meta-item">
                            <FaClock />
                            {result.duration}
                          </div>
                        )}
                        {(result.salary || result.fees) && (
                          <div className="meta-item">
                            💰 {result.salary || result.fees}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="description">{result.description}</div>
                  
                  <div className="tags">
                    {result.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="footer">
                    {result.rating && (
                      <div className="rating">
                        <FaStar />
                        {result.rating}
                      </div>
                    )}
                    <div className="action">
                      Learn More
                      <FaArrowRight />
                    </div>
                  </div>
                </ResultCard>
              );
            })
          ) : (
            <NoResults>
              <div className="icon">
                <FaSearch />
              </div>
              <div className="title">No results found</div>
              <div className="subtitle">
                Try adjusting your search terms or filters
              </div>
              <div className="suggestions">
                <div className="suggestion" onClick={() => navigate('/science')}>
                  Engineering Careers
                </div>
                <div className="suggestion" onClick={() => navigate('/commerce')}>
                  Business Careers
                </div>
                <div className="suggestion" onClick={() => navigate('/arts')}>
                  Creative Careers
                </div>
                <div className="suggestion" onClick={() => navigate('/assessment')}>
                  Take Assessment
                </div>
              </div>
            </NoResults>
          )}
        </ResultsGrid>
      </ResultsContent>
    </SearchResultsContainer>
  );
};

export default SearchResults;
