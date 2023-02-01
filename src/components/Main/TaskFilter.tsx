import { UpdateFilter, OnSelect } from '../../types';

interface TaskFilterProps {
  updateFilter: UpdateFilter;
  filt: string;
}

export default function TaskFilter({ updateFilter, filt }: TaskFilterProps) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'completed', label: 'Completed' }
  ];

  const onSelect: OnSelect = (item) => {
    updateFilter(item.name);
  };

  const butt = buttons.map((item) => {
    const active = filt === item.name;
    const classes = active ? 'btn-info' : 'btn-outline-secondary';
    return (
      <button key={item.name} className={`btn ${classes}`} onClick={() => onSelect(item)}>
        {item.label}
      </button>
    );
  });

  return <div className='btn-group'>{butt}</div>;
}
