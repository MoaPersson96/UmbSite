import { ColoredPuff } from '../puff/ColoredPuff';

// Moa
type ColorPuff = {
    label: string;
    title: string;
    href?: string;
    arrowBackgroundColor?: string;
};

type Props = { items: ColorPuff[] };

export function ColoredPuffGrid({ items }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {items.map((item, i) => (
                <ColoredPuff key={i} {...item} />
            ))}
        </div>
    );
}