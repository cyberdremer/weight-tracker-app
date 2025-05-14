"use client";
import {
  Portal,
  For,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";

const SelectFragment = ({
  selectItems,
  placeholder,
  label,
  handleClick,
  name,
  value,
}) => {
  return (
    <>
      <Select.Root
        collection={selectItems}
        name={name}
        value={value}
        onValueChange={handleClick}
      >
        <Select.HiddenSelect></Select.HiddenSelect>
        <Select.Label>{label}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder}></Select.ValueText>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator></Select.Indicator>
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {selectItems.items.map((items, index) => (
                <Select.Item item={items} key={index} name={name}>
                  {items}
                  <Select.ItemIndicator></Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  );
};

export default SelectFragment;
