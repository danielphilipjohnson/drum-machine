
interface SliderControlProps {
	label: string;
	value?: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	min?: number;
	max?: number;
	defaultValue?: number;
}

export const SliderControl = ({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	defaultValue = 50,
}: SliderControlProps) => {
	return (
		<div className="mb-4">
			<div className="flex justify-between mb-1">
				<label htmlFor={`${label}-slider`} className="text-zinc-300 text-sm">
					{label}
				</label>
				<span className="text-zinc-400 text-sm">{value || defaultValue}</span>
			</div>
			<input
				id={`${label}-slider`}
				type="range"
				min={min}
				max={max}
				value={value || defaultValue}
				onChange={onChange}
				className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
				aria-label={label}
			/>
		</div>
	);
};
