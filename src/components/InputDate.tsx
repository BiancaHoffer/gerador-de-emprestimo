import { dateFormat } from "@/utils/dateFormart";
import { ComponentProps } from "react";

interface CalenderProps extends ComponentProps<'input'> {
  value: any;
}

export function InputDate({ value, ...props }: CalenderProps) {
  return (
    <div className="relative w-[100%]">
      <input
        type="date"
        id="input-date"
        value={value}
        className="w-full"
        {...props}
      />
      <button className="w-full p-3 bg-zinc-50 rounded-lg shadow-md text-base focus-within:shadow-lg cursor-pointer focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black">
        <p className="text-start">
          {dateFormat(value)}
        </p>
      </button>
    </div>
  )
}