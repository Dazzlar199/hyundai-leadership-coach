"use client";

import { Badge } from "@/components/ui/badge";
import { CORE_VALUES, ValueKey } from "@/types";
import rules from "@/data/rules.json";

interface ValueFilterProps {
  selectedValue: ValueKey | "all";
  onValueChange: (value: ValueKey | "all") => void;
}

export function ValueFilter({ selectedValue, onValueChange }: ValueFilterProps) {
  const values = [{ key: "all", label: "전체보기" }, ...rules.values];

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge
          key={value.key}
          variant={selectedValue === value.key ? "default" : "secondary"}
          onClick={() => onValueChange(value.key as ValueKey | "all")}
          className="cursor-pointer"
        >
          {value.label}
        </Badge>
      ))}
    </div>
  );
}
