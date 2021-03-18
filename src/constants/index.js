export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

export const config = {
  toolbar: [
    {
      name: "editing",
      groups: ["find", "selection", "spellchecker"],
      items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
    },
    {
      name: "forms",
      items: [
        "Form",
        "Checkbox",
        "Radio",
        "TextField",
        "Textarea",
        "Select",
        "Button",
        "ImageButton",
        "HiddenField",
      ],
    },
    "/",
    {
      name: "basicstyles",
      groups: ["basicstyles", "cleanup"],
      items: ["Bold", "Italic", "Underline"],
    },
    {
      name: "paragraph",
      items: ["NumberedList", "BulletedList"],
    },
    { name: "colors", items: ["TextColor"] },
  ],
};
