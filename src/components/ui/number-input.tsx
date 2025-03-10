
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  showControls?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      min = 1,
      max = 20,
      step = 1,
      onChange,
      showControls = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      
      if (isNaN(newValue)) {
        onChange(min);
        return;
      }

      const clampedValue = Math.min(Math.max(newValue, min), max);
      onChange(clampedValue);
    };

    const increment = () => {
      if (value < max) {
        onChange(Math.min(value + step, max));
      }
    };

    const decrement = () => {
      if (value > min) {
        onChange(Math.max(value - step, min));
      }
    };

    return (
      <div className="flex items-center">
        {showControls && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={decrement}
            disabled={disabled || value <= min}
          >
            <Minus className="h-3 w-3" />
          </Button>
        )}
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            showControls && "rounded-l-none rounded-r-none border-l-0",
            className
          )}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {showControls && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={increment}
            disabled={disabled || value >= max}
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
