import { Node, Edge } from 'reactflow';

import styles from './styles.module.css';

export const nodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    style: { width: 200, height: 100, backgroundColor: '#00d7ca' },
    data: { label: 'Move me around' },
    className: styles.node,
  },
  {
    id: '2',
    position: { x: 320, y: 125 },
    style: { width: 220, height: 400, backgroundColor: '#6ede87' },
    data: { label: 'Move me around' },
    className: styles.node,
  },
  {
    id: '3',
    position: { x: -55, y: 220 },
    style: { width: 125, height: 220, backgroundColor: '#ff6700' },
    data: { label: 'Move me around' },
    className: styles.node,
  },
  {
    id: '4',
    position: { x: 250, y: -160 },
    style: { width: 180, height: 180, backgroundColor: '#ff0071' },
    data: { label: 'Move me around' },
    className: styles.node,
  },
  {
    id: '5',
    position: { x: -120, y: 600 },
    style: { width: 300, height: 120, backgroundColor: '#784be8' },
    data: { label: 'Move me around' },
    className: styles.node,
  },
];

export const edges: Edge[] = [];
