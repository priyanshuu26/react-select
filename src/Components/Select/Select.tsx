import React, { useEffect, useState } from 'react';
import { Option, SelectProps } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  options,
  isMulti = false,
  clearable = false,
  noResultsMessage = 'No results found',
  onChange = () => {},
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [focusedOption, setFocusedOption] = useState<number>(0);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    if (option.disabled) return;

    let updatedSelection: Option[] | Option | null;

    if (isMulti) {
      updatedSelection = selectedOptions.includes(option)
        ? selectedOptions.filter((opt) => opt.value !== option.value)
        : [...selectedOptions, option];
    } else {
      updatedSelection = selectedOptions.includes(option) ? null : [option];
      setIsOpen(false);
    }

    setSelectedOptions(
      isMulti ? (updatedSelection as Option[]) : ([option] as Option[])
    );
    onChange(
      isMulti ? (updatedSelection as Option[]) : (updatedSelection?.[0] as Option)
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFocusedOption(0); 
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && searchText === '' && selectedOptions.length > 0) {
      const updatedSelection = [...selectedOptions];
      updatedSelection.pop();
      setSelectedOptions(updatedSelection);

      onChange(
        isMulti
          ? updatedSelection
          : ((updatedSelection[0] || null) as Option | null)
      );
    }  if (event.key === 'ArrowDown' && focusedOption !== null) {
      const nextIndex = focusedOption + 1;
      if (nextIndex < filteredOptions.length) {
        setFocusedOption(nextIndex);
      }
    }  if (event.key === 'ArrowUp' && focusedOption !== null) {
      const prevIndex = focusedOption - 1;
      if (prevIndex >= 0) {
        setFocusedOption(prevIndex);
      }
    }  if (event.key === 'Enter' && focusedOption !== null) {
      const option = filteredOptions[focusedOption];
      handleOptionClick(option);
      setFocusedOption(0);
    }
  };

  const handleRemoveOption = (option: Option) => {
    setSelectedOptions((prev) =>
      prev.filter((selectedOption) => selectedOption.value !== option.value)
    );
    onChange(
      isMulti
        ? selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : null
    );
  };

  const clearAll = () => {
    setSelectedOptions([]);
    onChange(isMulti ? [] : null);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase()) &&
      !selectedOptions.some((selectedOption) => selectedOption.value === option.value)
  );

  return (
    <div className={`relative ${isMulti ? 'w-[700px]' : 'w-[300px]'} max-w-[700px] font-sans`}>
      <div
        className={`flex items-center px-2 py-1 pr-1 overflow-x-auto border border-gray-300 rounded-md bg-white text-black cursor-pointer ${
          isOpen ? 'border-gray-500' : ''
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center w-full  gap-1">
          {isMulti &&
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 mr-2 px-2 py-1 bg-gray-200 rounded-md whitespace-nowrap"
              >
                {opt.label}
                <span
                  className="cursor-pointer text-sm hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(opt);
                  }}
                >
                  &#10005;
                </span>
              </span>
            ))}
          <input
            type="text"
            placeholder={selectedOptions.length === 0 ? 'Select...' : ''}
            value={
              isMulti
                ? searchText
                : searchText || (selectedOptions[0]?.label || '')
            }
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-white border-none outline-none text-black box-border"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown(); 
            }}
          />
        </div>
        <div
          className={`bg-white absolute flex items-center justify-between gap-2 w-12 h-8 top-[7px] ${clearable && selectedOptions.length > 0 ? 'right-4  w-12 ' : 'w-9 right-0'} px-2`}
        >
          {clearable && selectedOptions.length > 0 && (
            <div
              className="cursor-pointer text-sm hover:text-red-500 pr-2.5 border-r-2 border-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
            >
              &#10005;
            </div>
          )}
          <div className="cursor-pointer">{isOpen ? '▲' : '▼'}</div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 bg-white rounded-md max-h-[300px] overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (
            <ul className="cursor-not-allowed">
              {filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`px-2 py-1 text-black cursor-pointer ${
                    option.disabled ? 'text-gray-400 pointer-events-none' : ''
                  } ${focusedOption === index ? 'bg-gray-200' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-2 py-1 text-center text-gray-500">{noResultsMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};
