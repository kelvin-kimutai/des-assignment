/* eslint-disable react-hooks/exhaustive-deps */
import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import { Fragment, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { HiCheck } from "react-icons/hi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  items,
  label,
  loading,
  name,
  placeholder,
  onChangeHandler,
}) {
  const [field, meta] = useField({ name });

  const [selected, setSelected] = useState({
    id: 0,
    name: placeholder,
    value: "",
  });

  useEffect(() => {
    if (loading === false || loading === undefined)
      setSelected(
        field.value
          ? items.find((e) => e.id === field.value)
          : {
              id: 0,
              name: "",
              value: "",
            }
      );
  }, [loading]);

  return (
    <div>
      <Listbox
        value={field.value}
        onChange={(item) => {
          setSelected(item);
          field.onChange({ target: { value: item.value, name } });
          if (onChangeHandler) onChangeHandler(item);
        }}
      >
        {({ open }) => (
          <>
            <div className="relative">
              {label && (
                <p className="w-max pb-1 font-medium text-blue-400">{label}</p>
              )}
              <Listbox.Button
                className={`${
                  meta.touched && meta.error
                    ? "border-2 border-red-400 focus:border-2 focus:border-red-400"
                    : ""
                } relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 `}
              >
                <span className="flex items-center">
                  <p
                    className={`${
                      selected.value === null || selected.value === ""
                        ? "text-[#CACACA]"
                        : ""
                    } block truncate`}
                  >
                    {selected.value === null || selected.value === ""
                      ? placeholder ?? ""
                      : selected.name}
                  </p>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <MdArrowDropDown className="h-5 w-5 text-blue-400" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-2 max-h-56 w-fit min-w-full overflow-auto rounded-md border border-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 scrollbar-hide">
                  {items &&
                    items.map((item, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-green-400 bg-opacity-80 text-white"
                              : "",
                            "relative cursor-default select-none py-2 pl-3 pr-9 transition"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center text-sm sm:text-base">
                              <span
                                className={classNames(
                                  selected ? "font-medium" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {item.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-green-400",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {meta.touched && meta.error && (
        <span className="text-red-400">{meta.error}</span>
      )}
    </div>
  );
}
