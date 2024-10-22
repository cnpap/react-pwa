import React, { useState, KeyboardEvent } from 'react';
import { commonInterests, roleSpecificInterests } from './data';

interface RegisterOnboardingInterestChooseProps {
  role: string;
  onSelect: (interests: string[]) => void;
  onBack: () => void;
}

function RegisterOnboardingInterestChoose({
  role,
  onSelect,
  onBack,
}: RegisterOnboardingInterestChooseProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState<string>('');

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const handleCustomInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInterest(e.target.value);
  };

  const handleCustomInterestKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInterest.trim() !== '') {
      e.preventDefault();
      if (!selectedInterests.includes(customInterest.trim())) {
        setSelectedInterests((prev) => [...prev, customInterest.trim()]);
      }
      setCustomInterest('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSelect(selectedInterests);
  };

  const renderInterestGroup = (group: { title: string; options: string[] }) => (
    <div key={group.title} className="mb-4">
      <h3 className="mb-2 text-sm font-medium">{group.title}</h3>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {group.options.map((interest) => (
          <li key={interest}>
            <input
              type="checkbox"
              id={interest}
              value={interest}
              className="hidden peer"
              onChange={() => handleInterestChange(interest)}
              checked={selectedInterests.includes(interest)}
            />
            <label
              htmlFor={interest}
              className="inline-flex items-center justify-center w-full p-1 text-xs text-gray-500 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 bg-gray-50 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              {interest}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="mb-2 text-md font-medium">已选择的标签：</h3>
          <ul className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <li
                key={interest}
                className="bg-primary-100 text-primary-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleInterestChange(interest)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={customInterest}
            onChange={handleCustomInterestChange}
            onKeyDown={handleCustomInterestKeyDown}
            placeholder="输入自定义标签，按回车添加"
            className="w-full p-2 text-sm text-gray-500 border border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        {renderInterestGroup(commonInterests)}
        {roleSpecificInterests[role]?.map(renderInterestGroup)}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          返回
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          下一步
        </button>
      </div>
    </form>
  );
}

export default RegisterOnboardingInterestChoose;
