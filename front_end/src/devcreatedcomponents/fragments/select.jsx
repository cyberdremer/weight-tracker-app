"use client";
import {
  Portal,
  For,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";


const SelectFragment = ({ selectItems }) => {
  return (
    <>
      <Select.Root collection={selectItems}>
        <Select.HiddenSelect></Select.HiddenSelect>
        <Select.Label>Enter desired units</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select unit of measurements"></Select.ValueText>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator></Select.Indicator>
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {selectItems.items.map((items, index) => (
                <Select.Item item={items} key={index} name={items}>
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
