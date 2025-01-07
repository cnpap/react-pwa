import { ArrayFieldTemplateProps } from '@rjsf/utils';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const ArrayFieldTemplate = ({
  title,
  items,
  canAdd,
  onAddClick,
  required,
}: ArrayFieldTemplateProps) => {
  return (
    <div className="space-y-2 bg-card border border-border text-card-foreground">
      {(title || canAdd) && (
        <div className="flex items-center bg-slate-50 justify-between border-b-4 border-main/80 px-4 py-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {title}
                {required && <span className="ml-1 text-destructive">*</span>}
              </h3>
            )}
          </div>
          {canAdd && (
            <button
              type="button"
              onClick={onAddClick}
              className="inline-flex items-center rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              添加
            </button>
          )}
        </div>
      )}
      <div className="divide-y divide-border">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            暂无内容，点击上方添加按钮新增
          </div>
        ) : (
          items.map((item) => (
            <div key={item.key} className="group relative px-4 py-4 first:pt-2 last:pb-4">
              <div className="pr-14">{item.children}</div>
              {item.hasRemove && (
                <button
                  type="button"
                  onClick={item.onDropIndexClick(item.index)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 rounded-sm p-2 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                  title="删除"
                >
                  <TrashIcon className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArrayFieldTemplate;
