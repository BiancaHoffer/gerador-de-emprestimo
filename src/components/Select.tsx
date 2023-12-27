import { Dispatch, Fragment, SetStateAction } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface SelectProps {
  selected: any;
  setSelected: any;
  paymentMethods: any;
}

export function Select({
  selected,
  setSelected,
  paymentMethods
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-full">
        <Listbox.Button className="relative cursor-pointer w-full border-[2px] border-transparent rounded-lg bg-zinc-50 p-3 text-left shadow-md focus:outline-none active:shadow-xl focus:shadow-xl focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black sm:text-sm">
          <span className="block truncate text-zinc-400 text-base">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-900"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-[170px] w-full opacity-100 overflow-auto rounded-md bg-zinc-50 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ">
            {paymentMethods.map((method: any, index: any) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg- text-primary' : 'text-gray-900'
                  }`
                }
                value={method}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {method.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}