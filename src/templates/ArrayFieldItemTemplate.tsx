import { ArrayFieldTemplateItemType } from '@rjsf/utils';
import { TrashIcon } from '@heroicons/react/24/outline';

const ArrayFieldItemTemplate = ({
  children,
  onDropIndexClick,
  index,
  hasRemove,
  hasMoveUp,
  hasMoveDown,
  onReorderClick,
}: ArrayFieldTemplateItemType) => {
  return (
    <div className="group relative border border-gray-100 rounded-sm p-3">
      <div className="pr-10">{children}</div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100">
        {hasMoveUp && (
          <button
            type="button"
            onClick={onReorderClick(index, index - 1)}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            title="上移"
          >
            ↑
          </button>
        )}
        {hasMoveDown && (
          <button
            type="button"
            onClick={onReorderClick(index, index + 1)}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            title="下移"
          >
            ↓
          </button>
        )}
        {hasRemove && (
          <button
            type="button"
            onClick={onDropIndexClick(index)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="删除"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ArrayFieldItemTemplate;
