import { roleOptions } from './data';

interface RegisterOnboardingRoleChooseProps {
  onSelect: (role: string) => void;
}

function RegisterOnboardingRoleChoose({ onSelect }: RegisterOnboardingRoleChooseProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-lg font-semibold">选择你的角色：</h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {roleOptions.map((role) => (
          <li key={role.id}>
            <button
              onClick={() => onSelect(role.id)}
              className="flex flex-col items-center justify-center w-full p-5 text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:border-primary-600 hover:text-primary-600 bg-gray-50 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span dangerouslySetInnerHTML={{ __html: role.icon }} />
              <span className="w-full text-center">{role.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterOnboardingRoleChoose;
