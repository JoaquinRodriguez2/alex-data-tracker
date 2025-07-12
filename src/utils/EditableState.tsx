import { useState } from 'react';

export function useEditableState(initialValue: boolean = false) {
    const [isEditable, setIsEditable] = useState<boolean>(initialValue);

    return { isEditable, setIsEditable };
}
