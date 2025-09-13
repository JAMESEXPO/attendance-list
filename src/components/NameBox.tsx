import React from 'react';
import { User, Package } from 'lucide-react';
import { Person, Item } from '../types';

interface NameBoxProps {
  person: Person;
  items: Item[];
  attendanceData: Record<string, boolean>;
  onToggleAttendance: (itemId: string) => void;
}

const NameBox: React.FC<NameBoxProps> = ({
  person,
  items,
  attendanceData,
  onToggleAttendance,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      {/* Name Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200 px-4 py-3">
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-lg mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
            <p className="text-sm text-blue-600">
              {Object.values(attendanceData).filter(Boolean).length} / {items.length} items selected
            </p>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Package className="w-4 h-4 text-gray-600 mr-2" />
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Items
          </h4>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                attendanceData[item.id]
                  ? 'border-green-300 bg-green-50 shadow-sm'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => onToggleAttendance(item.id)}
            >
              <div className="flex items-center flex-1">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors ${
                    attendanceData[item.id]
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {attendanceData[item.id] && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`font-medium transition-colors ${
                    attendanceData[item.id] ? 'text-green-800' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  attendanceData[item.id]
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {attendanceData[item.id] ? 'Selected' : 'Not Selected'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NameBox;