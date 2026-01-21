import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';

type Props = {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => { success: boolean; error?: string };
};

export function EditNameModal({ isOpen, currentName, onClose, onSave }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <EditNameForm currentName={currentName} onClose={onClose} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}

type FormProps = {
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => { success: boolean; error?: string };
};

function EditNameForm({ currentName, onClose, onSave }: FormProps) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onSave(name);
    if (result.success) {
      onClose();
    } else {
      setError(result.error ?? '이름 수정에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>이름 수정</DialogTitle>
        <DialogDescription>즐겨찾기 장소의 별칭을 수정합니다.</DialogDescription>
      </DialogHeader>

      <div className="my-4">
        <Input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          maxLength={20}
          placeholder="장소 이름 입력 (1~20자)"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </DialogFooter>
    </form>
  );
}
