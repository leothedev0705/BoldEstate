import React from 'react';
import { MapPin, Bed, Bath, Square, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import Badge from './Badge';

const PropertyCard = ({ property, size = 'normal' }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.includes(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const cardClasses = size === 'small' 
    ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300'
    : 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group';

  const imageClasses = size === 'small'
    ? 'w-full h-32 object-cover'
    : 'w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300';

  return (
    <Link to={`/property/${property.slug}`} className="block">
      <div className={cardClasses}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className={imageClasses}
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Rating */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>{property.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className={size === 'small' ? 'p-3' : 'p-4 md:p-6'}>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {property.tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 ${
            size === 'small' ? 'text-sm' : 'text-lg md:text-xl'
          }`}>
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className={`line-clamp-1 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
              {property.location}
            </span>
          </div>

          {/* Features */}
          <div className={`flex items-center space-x-4 text-gray-600 mb-3 ${
            size === 'small' ? 'text-xs' : 'text-sm'
          }`}>
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} BHK</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className={`font-bold text-royal-violet ${
                size === 'small' ? 'text-lg' : 'text-xl md:text-2xl'
              }`}>
                {property.price}
              </span>
            </div>
            
            {/* Agent Info */}
            {property.agent && (
              <div className="flex items-center">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 