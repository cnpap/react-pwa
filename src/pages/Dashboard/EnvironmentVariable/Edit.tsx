import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Handle,
  MiniMap,
  Node,
  NodeProps,
  NodeTypes,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, Flag, GripVertical, Maximize2, Minimize2, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/toaster';

interface Variable {
  name: string;
  value: string;
  type: 'value' | 'secret';
}

// 定义节点数据的接口
interface VariableNodeData extends Record<string, unknown> {
  variables: Array<Variable>;
  onTypeChange: (index: number, type: 'value' | 'secret') => void;
  hasWarning?: boolean;
}

// 添加结束节点的数据接口
interface EndNodeData extends Record<string, unknown> {
  label: string;
}

// 修改 EndNode 组件为 StartNode 组件
function StartNode() {
  return (
    <div className="min-w-[160px] p-1 shadow-sm relative bg-slate-100">
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-slate-500 !w-[6px] !h-[20px] !rounded-none !border-none !-right-[3px] hover:!w-[8px] transition-all"
      />
      <div className="relative rounded-sm p-3 flex items-center justify-center gap-2">
        <div className="p-1.5 rounded-full bg-slate-50">
          <Flag className="h-4 w-4 text-slate-800" />
        </div>
        <span className="text-sm font-medium text-slate-800">start</span>
      </div>
    </div>
  );
}

// 更新变量节点组件
function VariableNode({
  data,
  selected,
}: NodeProps<
  VariableNodeData & { id: string; position: { x: number; y: number }; data: VariableNodeData }
>) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [visibleValues, setVisibleValues] = useState<Set<number>>(new Set());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Double clicked on node:', data);
  };

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000); // 2秒后重置状态
      })
      .catch(() => {
        toast.error('复制失败');
      });
  };

  const toggleValueVisibility = (index: number) => {
    setVisibleValues((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div
      className={`min-w-[400px] shadow-sm transition-all duration-200 relative border-0 ${
        selected ? 'ring-2 ring-slate-500 ring-offset-2 ring-offset-slate-200' : ''
      } ${data.hasWarning ? 'border-yellow-500/50 bg-yellow-50/50' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`!w-[6px] !h-[20px] !rounded-none !border-none !-left-[3px] hover:!w-[8px] transition-all !top-[30px] ${
          data.hasWarning ? '!bg-yellow-500' : '!bg-main'
        }`}
      />
      <div
        className={`px-6 py-3 flex items-center justify-between ${
          data.hasWarning
            ? 'bg-yellow-500/10 border-b-4 border-yellow-500/20'
            : 'bg-slate-100 border-b-4 border-main'
        }`}
      >
        <span className={`text-xl ${data.hasWarning ? 'text-yellow-700' : 'text-main'}`}>
          environment variable
        </span>
        <div className="cursor-move p-1.5 hover:bg-slate-500/10 rounded-sm transition-colors">
          <GripVertical
            className={`h-5 w-5 ${data.hasWarning ? 'text-yellow-500/70' : 'text-slate-500/70'}`}
          />
        </div>
      </div>
      <div className="bg-slate-50" onDoubleClick={handleDoubleClick}>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] pl-6">name</TableHead>
              <TableHead className="pl-6">value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.variables?.map((variable: Variable, index: number) => (
              <TableRow
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium pl-6">{variable.name}</TableCell>
                <TableCell className="pl-6">
                  <span>
                    {variable.type === 'secret'
                      ? visibleValues.has(index)
                        ? variable.value
                        : '••••••••'
                      : variable.value}
                  </span>
                </TableCell>
                {hoveredRow === index && (
                  <div className="absolute inset-0 bg-background/20 hover:bg-background/80 transition-colors duration-200 backdrop-blur-sm flex items-center justify-center gap-2">
                    {copiedIndex === index ? (
                      <div className="flex items-center gap-1 text-green-600 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <Check className="h-4 w-4" />
                        <span className="text-xs">已复制</span>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(variable.value, index);
                          }}
                          className="h-7 px-3 text-xs hover:bg-slate-500/10 hover:text-slate-600"
                        >
                          复制
                        </Button>
                        {variable.type === 'secret' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleValueVisibility(index);
                            }}
                            className="h-7 px-3 text-xs hover:bg-slate-500/10 hover:text-slate-600"
                          >
                            {visibleValues.has(index) ? '隐藏' : '显示'}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex border-t border-slate-200 items-center justify-between p-3">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            添加变量
          </Button>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className={`!w-[6px] !h-[20px] !rounded-none !border-none !-right-[3px] hover:!w-[8px] transition-all !top-[30px] ${
          data.hasWarning ? '!bg-yellow-500' : '!bg-slate-500'
        }`}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variable: VariableNode as any,
  start: StartNode,
};

// 更新节点类型定义
type CustomNode = Node<VariableNodeData> | Node<EndNodeData>;

// 创建一个包装组件来使用 ReactFlow hooks
function EnvironmentVariableEditContent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  console.log(selectedNode);
  const { getViewport, screenToFlowPosition } = useReactFlow();
  console.log(getViewport);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 更新循环依赖检测函数
  const detectCircularDependencies = useCallback(() => {
    const graph = new Map<string, string[]>();
    const cycles: string[][] = [];

    edges.forEach((edge: Edge) => {
      if (!graph.has(edge.source)) {
        graph.set(edge.source, []);
      }
      graph.get(edge.source)?.push(edge.target);
    });

    // 深度优先搜索检测循环
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const circularEdges = new Set<string>();
    const currentPath: string[] = [];

    function dfs(node: string): boolean {
      if (recursionStack.has(node)) {
        // 找到循环，记录循环路径
        const cycleStartIndex = currentPath.indexOf(node);
        const cycle = currentPath.slice(cycleStartIndex);
        cycles.push([...cycle, node]);

        // 标记循环中的边
        for (let i = cycleStartIndex; i < currentPath.length - 1; i++) {
          circularEdges.add(`${currentPath[i]}-${currentPath[i + 1]}`);
        }
        circularEdges.add(`${currentPath[currentPath.length - 1]}-${node}`);
        return true;
      }

      if (visited.has(node)) {
        return false;
      }

      visited.add(node);
      recursionStack.add(node);
      currentPath.push(node);

      const neighbors = graph.get(node) || [];
      let hasCycle = false;
      for (const neighbor of neighbors) {
        if (dfs(neighbor)) {
          hasCycle = true;
          // 不要立即返回，继续检查其他路径
        }
      }

      currentPath.pop();
      recursionStack.delete(node);
      return hasCycle;
    }

    // 检查所有节点
    nodes.forEach((node: CustomNode) => {
      if (!visited.has(node.id)) {
        dfs(node.id);
      }
    });

    // 更新边的状态，保持非循环边的原始样式
    setEdges(
      (eds) =>
        eds.map((edge: Edge) => {
          const edgeKey = `${edge.source}-${edge.target}`;
          const isInCycle = circularEdges.has(edgeKey);
          return {
            ...edge,
            isCircular: isInCycle,
            // 只更新循环依赖边的样式
            ...(isInCycle
              ? {
                  style: { stroke: '#ef4444', strokeWidth: 2 },
                }
              : {
                  style: { stroke: '#3b82f6', strokeWidth: 2 },
                }),
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as unknown as any,
    );

    return { hasCircular: circularEdges.size > 0, cycles };
  }, [edges, nodes, setEdges]);

  // 更新节点依赖检查函数
  const checkNodeDependencies = useCallback(() => {
    const outgoingEdges = new Map<string, string[]>();
    const incomingEdges = new Map<string, string[]>();

    edges.forEach((edge: Edge) => {
      // 记录出边
      if (!outgoingEdges.has(edge.source)) {
        outgoingEdges.set(edge.source, []);
      }
      outgoingEdges.get(edge.source)?.push(edge.target);

      // 记录入边
      if (!incomingEdges.has(edge.target)) {
        incomingEdges.set(edge.target, []);
      }
      incomingEdges.get(edge.target)?.push(edge.source);
    });

    // 检查是否所有节点都可以从开始节点到达
    const reachableFromStart = new Set<string>();
    function findPathFromStart(nodeId: string, visited = new Set<string>()) {
      if (reachableFromStart.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      reachableFromStart.add(nodeId);

      const targets = outgoingEdges.get(nodeId) || [];
      for (const target of targets) {
        findPathFromStart(target, visited);
      }
      return true;
    }

    // 从开始节点开始遍历
    findPathFromStart('start-node');

    // 更新节点状态
    setNodes(
      (nds) =>
        nds.map((node: CustomNode) => {
          if (node.type === 'start') return node;

          const hasIncoming = (incomingEdges.get(node.id)?.length || 0) > 0;
          const isReachableFromStart = reachableFromStart.has(node.id);

          // 检查是否有入边且是否可从开始节点到达
          const hasWarning = !hasIncoming || !isReachableFromStart;

          return {
            ...node,
            data: {
              ...node.data,
              hasWarning,
            },
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as unknown as any,
    );
  }, [edges, setNodes]);

  // 处理保存
  const handleSave = useCallback(() => {
    const { hasCircular, cycles } = detectCircularDependencies();
    checkNodeDependencies(); // 添加依赖检查

    if (hasCircular) {
      console.warn('检测到循环依赖！');
      cycles.forEach((cycle, index) => {
        // 获取循环中节点的名称
        const nodeNames = cycle.map((nodeId) => {
          const node = nodes.find((n: CustomNode) => n.id === nodeId);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (node as any)?.data?.name || nodeId;
        });
        console.warn(`循环依赖 ${index + 1}:`, nodeNames.join(' -> '));
      });
    } else {
      console.log('保存成功！');
    }
  }, [detectCircularDependencies, checkNodeDependencies, nodes]);

  // 初始化结束节点
  useEffect(() => {
    const startNode: Node = {
      id: 'start-node',
      type: 'start',
      position: { x: 100, y: 200 },
      data: { label: '开始' },
    };
    setNodes([startNode as never]);
  }, [setNodes]);

  // 处理节点选择
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    console.log('Selected node:', node);
  }, []);

  // 处理节点连接
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(
        (eds: Edge[]) =>
          addEdge(
            {
              ...connection,
              type: 'bezier',
              style: { stroke: '#3b82f6', strokeWidth: 2 },
            },
            eds,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as unknown as any,
      );
    },
    [setEdges],
  );

  // 添加新变量节点时的位置计算更新
  const addVariableNode = useCallback(() => {
    const centerPosition = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode: Node<VariableNodeData> = {
      id: `variable-${nodes.length}`,
      type: 'variable',
      position: centerPosition,
      data: {
        variables: [
          { name: 'DATABASE_URL', value: 'postgresql://localhost:5432/db', type: 'value' },
          { name: 'API_KEY', value: 'sk-123456789', type: 'secret' },
          { name: 'PORT', value: '3000', type: 'value' },
        ],
        onTypeChange: (index: number, type: 'value' | 'secret') => {
          setNodes(
            (nds) =>
              nds.map((node: CustomNode) => {
                if (node.id === newNode.id && node.type === 'variable') {
                  const nodeData = node.data as VariableNodeData;
                  const newVariables = [...nodeData.variables];
                  newVariables[index] = { ...newVariables[index], type } as Variable;
                  return {
                    ...node,
                    data: { ...nodeData, variables: newVariables },
                  };
                }
                return node;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }) as unknown as any,
          );
        },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setNodes((nds: CustomNode[]) => [...nds, newNode] as unknown as any);
  }, [nodes.length, screenToFlowPosition, setNodes]);

  // 添加返回处理函数
  const handleBack = () => {
    navigate('/dashboard/environment-variable');
  };

  // 添加全屏切换函数
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(`全屏切换失败: ${err.message}`);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error(`退出全屏失败: ${err.message}`);
        });
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">编辑环境变量</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          <Button onClick={addVariableNode} size="sm" className="rounded-sm">
            <Plus className="h-4 w-4 mr-1" />
            添加变量
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            保存
          </Button>
        </div>
      </div>

      <div className={`flex-1 h-[500px] bg-gray-100 ${isFullscreen ? 'h-screen' : ''}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{
            hideAttribution: true,
          }}
          defaultEdgeOptions={{
            type: 'bezier',
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          }}
          className="bg-gray-100"
        >
          <Background color="#9ca3af" gap={20} size={1} />
          <Controls className="bg-white border-gray-200 fill-gray-600" />
          <MiniMap
            nodeColor="#ff3f1a"
            // viewportClassName={'border-2 border-slate-500' as string}
            maskColor="rgba(243, 244, 246, 0.4)"
            className="bg-white border border-gray-100 shadow-sm rounded-sm"
            style={{
              background: '#f3f4f6',
              padding: '6px',
            }}
            pannable={true}
            zoomable={true}
            ariaLabel="流程图缩略图"
            nodeStrokeWidth={3}
            inversePan={false}
            maskStrokeColor="#ff3f1a"
            maskStrokeWidth={2}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

// 主导出组件用 ReactFlowProvider 包裹内容组件
export default function EnvironmentVariableEdit() {
  return (
    <ReactFlowProvider>
      <EnvironmentVariableEditContent />
      <Toaster />
    </ReactFlowProvider>
  );
}
