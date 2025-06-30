import React from 'react';
import { MapPin, Bed, Bath, Square, ExternalLink } from 'lucide-react';

const PropertyMiniCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex space-x-3">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
            {property.title}
          </h4>
          
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
            <div className="flex items-center">
              <Bed className="w-3 h-3 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-3 h-3 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-3 h-3 mr-1" />
              <span>{property.area}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-royal-violet">
              {property.price}
            </span>
            <a
              href={`/property/${property.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-royal-violet hover:text-electric-cyan flex items-center"
            >
              View <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMiniCard; 