import { RemovableRef, useStorage } from '@vueuse/core';

export default <T extends {}>(name: string, initialValue: T): (() => RemovableRef<T>) => (() => {
  const storage = useStorage(name, initialValue);
  for (const initialValueKey in initialValue) {
    if (!(initialValueKey in storage.value)) {
      storage.value[initialValueKey] = initialValue[initialValueKey];
    }
  }
  return storage;
});
