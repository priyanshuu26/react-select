import { useState } from 'react';
import { Option, Select } from './Components/Select';



const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'mint', label: 'Mint' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'hazelnut', label: 'Hazelnut' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry', disabled: true },
  { value: 'peanut_butter', label: 'Peanut Butter' },
  { value: 'mango', label: 'Mango' },
];

function App() {
  
  const [isMulti, setIsMulti] = useState(false);
  const [selectProps, setSelectProps] = useState({});
  const [clearable, setClearable] = useState(false);

  const onclicksetMulti = () => {
    setIsMulti(!isMulti);
    setSelectProps({  ...selectProps, isMulti: !isMulti });
  }
  const onclicksetClearable = () => {
    setClearable(!clearable);
    setSelectProps({ ...selectProps, clearable: !clearable });
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full h-screen pt-[5rem]">
      <h1 className="text-3xl font-bold underline text-slate-500">
        Vite + React + TypeScript
      </h1>
      <div className='flex gap-5'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={onclicksetMulti}>
          {isMulti ? 'Make it single select' : 'Make it multiple select'}
        </button> 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={onclicksetClearable}>        
          {clearable ? 'Make it clearable' : 'Make it not clearable'}
        </button>
      </div>
      <div className="flex justify-center w-full">
        <Select
          options={options}
          noResultsMessage='No flavor found'
          onChange={(selected) => console.log(selected)}
          {...selectProps}
        />
      </div>
      
    </div>
  );
}

export default App;
