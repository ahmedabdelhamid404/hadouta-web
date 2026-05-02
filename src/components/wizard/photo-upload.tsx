"use client";
import { useRef, useState } from "react";
import { useWizardStore } from "@/lib/wizard/store";
import { uploadPhoto } from "@/lib/wizard/api";
import { cn } from "@/lib/utils";

export function PhotoUpload() {
  const store = useWizardStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const photoIds = store.appearance.photoIds ?? [];

  const handleFile = async (file: File) => {
    if (!store.orderId) {
      setError("يجب إنشاء طلب أولاً");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("الصورة أكبر من ٥ ميجا");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const { photoId } = await uploadPhoto(store.orderId, file, "main_child");
      store.updateAppearance({ photoIds: [...photoIds, photoId] });
    } catch (e) {
      setError(
        e instanceof Error
          ? `فشل رفع الصورة: ${e.message}`
          : "فشل رفع الصورة",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => {
          const id = photoIds[i];
          return (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-2xl",
                id
                  ? "bg-gradient-to-br from-hadouta-blush/40 to-hadouta-ochre/40"
                  : "border-2 border-dashed border-border bg-background text-foreground/30",
              )}
            >
              {id ? "🖼️" : "+"}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={photoIds.length >= 3 || uploading}
        className="w-full border-2 border-dashed border-border rounded-lg py-6 text-center bg-background hover:bg-secondary/30 disabled:opacity-50 transition-colors"
      >
        <div className="text-2xl mb-1" aria-hidden="true">
          ⤴
        </div>
        <div className="font-heading font-semibold text-sm">
          {uploading
            ? "بنرفع..."
            : photoIds.length === 0
              ? "ضيف صورة"
              : photoIds.length >= 3
                ? "وصلت للحد الأقصى (٣)"
                : "ضيف صورة تانية"}
        </div>
        <div className="text-xs text-foreground/55">
          JPG · PNG · WEBP · حتى ٥ ميجابايت لكل صورة
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="bg-hadouta-ochre/10 border-r-2 border-hadouta-ochre rounded p-3 text-xs leading-relaxed">
        <strong>للحصول على أفضل نتيجة:</strong> صور بضوء نهار، الوجه واضح،
        خلفية مش مزدحمة. ٢-٣ صور أفضل من واحدة.
      </div>
    </div>
  );
}
