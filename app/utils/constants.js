const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const DATE_TIME_MODES = {
  DATE: "date",
  TIME: "time",
  DATETIME: "datetime",
};

export const ICONS = [
  // Work & Business
  "briefcase-outline",
  "calendar-outline",
  "clipboard-outline",
  "clipboard-list-outline",
  "clock-outline",
  "email-outline",
  "file-document-outline",
  "folder-outline",
  "bank-outline",
  "chart-box-outline",

  // Personal & Social
  "account-outline",
  "account-group-outline",
  "account-heart-outline",
  "account-star-outline",
  "chat-outline",
  "phone-outline",
  "message-outline",
  "heart-outline",
  "star-outline",
  "thumb-up-outline",

  // Shopping & Money
  "cart-outline",
  "cash",
  "credit-card-outline",
  "gift-outline",
  "shopping-outline",
  "store-outline",
  "tag-outline",
  "wallet-outline",
  "basket-outline",
  "package-variant-closed",

  // Health & Fitness
  "weight",
  "run",
  "bike",
  "yoga",
  "dumbbell",
  "meditation",
  "heart-pulse",
  "pill",
  "food-apple-outline",
  "water",

  // Home & Lifestyle
  "home-outline",
  "home-heart",
  "bed",
  "sofa",
  "washing-machine",
  "fridge-outline",
  "lightbulb-outline",
  "vacuum",
  "broom",
  "silverware-fork-knife",

  // Travel & Places (non-flag icons)
  "airplane-takeoff",
  "airplane-landing",
  "map-marker-outline",
  "compass-outline",
  "earth",
  "beach",
  "palm-tree",
  "mountain",
  "passport",
  "train-car",

  // Education & Learning
  "school-outline",
  "book-outline",
  "bookshelf",
  "pencil-outline",
  "notebook-outline",
  "brain",
  "calculator",
  "library",
  "school", // Replaced "graduation-cap" with "school"
  "presentation", // Replaced "teach" with "presentation"

  // Entertainment & Hobbies
  "palette-outline",
  "music-note",
  "movie-outline",
  "gamepad-variant-outline",
  "camera-outline",
  "television",
  "headphones",
  "guitar-electric",
  "cards",
  "puzzle-outline",

  // Technology
  "laptop",
  "desktop-tower",
  "cellphone",
  "tablet",
  "keyboard",
  "mouse",
  "printer",
  "wifi",
  "bluetooth",
  "code-tags",

  // Nature & Weather
  "weather-sunny",
  "weather-rainy",
  "weather-snowy",
  "leaf",
  "flower",
  "tree",
  "cloud-outline",
  "sun-wireless-outline",
  "moon-waning-crescent",
  "thermometer",
];

export const COLORS = [
  // Reds
  "#FF0000", // Red
  "#FF4D4D", // Light Red
  "#CC0000", // Dark Red
  "#FFB5B5", // Very Light Red
  "#8B0000", // Dark Red

  // Blues
  "#0000FF", // Blue
  "#4D4DFF", // Light Blue
  "#0000CC", // Dark Blue
  "#B5B5FF", // Very Light Blue
  "#00008B", // Dark Navy

  // Greens
  "#00FF00", // Green
  "#4DFF4D", // Light Green
  "#00CC00", // Dark Green
  "#B5FFB5", // Very Light Green
  "#008B00", // Forest Green

  // Yellows
  "#FFFF00", // Yellow
  "#FFFF4D", // Light Yellow
  "#CCCC00", // Dark Yellow
  "#FFFFB5", // Very Light Yellow
  "#8B8B00", // Olive

  // Purples
  "#800080", // Purple
  "#B366B3", // Light Purple
  "#4D004D", // Dark Purple
  "#FFB3FF", // Very Light Purple
  "#2E0854", // Deep Purple

  // Oranges
  "#FFA500", // Orange
  "#FFB84D", // Light Orange
  "#CC8400", // Dark Orange
  "#FFE5B5", // Very Light Orange
  "#8B5A00", // Brown Orange

  // Teals
  "#008080", // Teal
  "#4DCCCC", // Light Teal
  "#006666", // Dark Teal
  "#B5FFFF", // Very Light Teal
  "#004D4D", // Deep Teal

  // Pinks
  "#FF69B4", // Pink
  "#FF99CC", // Light Pink
  "#CC5490", // Dark Pink
  "#FFB5D6", // Very Light Pink
  "#8B3A62", // Deep Pink

  // Grays
  "#808080", // Gray
  "#A6A6A6", // Light Gray
  "#595959", // Dark Gray
  "#D9D9D9", // Very Light Gray
  "#262626", // Almost Black

  // Additional Colors
  "#FF7F50", // Coral
  "#9370DB", // Medium Purple
  "#20B2AA", // Light Sea Green
  "#DEB887", // Burly Wood
  "#5F9EA0", // Cadet Blue
  "#FF1493", // Deep Pink
  "#00CED1", // Dark Turquoise
  "#9932CC", // Dark Orchid
  "#8FBC8F", // Dark Sea Green
  "#E9967A", // Dark Salmon
];

export const FLAG_ICONS = [
  // Basic Flags
  "flag",
  "flag-outline",
  "flag-variant",
  "flag-variant-outline",
  "flag-checkered",

  // Priority/Status Indicators
  "star",
  "star-outline",
  "star-circle",
  "star-circle-outline",

  // Alert Levels
  "alert",
  "alert-circle",
  "alert-circle-outline",
  "alert-octagon",
  "alert-octagon-outline",

  // Markers
  "bookmark",
  "bookmark-outline",
  "bookmark-check",
  "bookmark-check-outline",

  // Indicators
  "circle",
  "circle-outline",
  "circle-slice-1",
  "circle-slice-2",
  "circle-slice-4",
  "circle-slice-8",

  // Shapes
  "rhombus",
  "rhombus-outline",
  "triangle",
  "triangle-outline",
  "shield",
  "shield-outline",

  // Status
  "check-circle",
  "check-circle-outline",
  "close-circle",
  "close-circle-outline",
  "minus-circle",
  "minus-circle-outline",

  // Priority
  "priority-high",
  "priority-low",
  "chevron-triple-up",
  "chevron-triple-down",

  // Misc Indicators
  "pin",
  "pin-outline",
  "tag",
  "tag-outline",
  "label",
  "label-outline",
];

export const FLAGS = [
  {
    name: "low",
    icon: getValue(FLAG_ICONS),
    backgroundColor: getValue(COLORS),
  },
  {
    name: "medium",
    icon: getValue(FLAG_ICONS),
    backgroundColor: getValue(COLORS),
  },
  {
    name: "high",
    icon: getValue(FLAG_ICONS),
    backgroundColor: getValue(COLORS),
  },
];

export const CATEGORIES = [
  {
    name: "Work",
    icon: "briefcase-outline",
    backgroundColor: "#FF7F50",
  },
  {
    name: "Personal",
    icon: "account-outline",
    backgroundColor: "#4169E1",
  },
  {
    name: "Shopping",
    icon: "cart-outline",
    backgroundColor: "#32CD32",
  },
  {
    name: "Health",
    icon: "heart-outline",
    backgroundColor: "#FF69B4",
  },
  {
    name: "Education",
    icon: "school-outline",
    backgroundColor: "#9370DB",
  },
  {
    name: "Finance",
    icon: "bank-outline",
    backgroundColor: "#008B8B",
  },
  {
    name: "Travel",
    icon: "airplane-takeoff",
    backgroundColor: "#FFD700",
  },
  {
    name: "Home",
    icon: "home-outline",
    backgroundColor: "#8B4513",
  },
  {
    name: "Fitness",
    icon: "weight",
    backgroundColor: "#FF4500",
  },
  {
    name: "Social",
    icon: "account-group-outline",
    backgroundColor: "#BA55D3",
  },
  {
    name: "Hobbies",
    icon: "palette-outline",
    backgroundColor: "#20B2AA",
  },
  {
    name: "Family",
    icon: "home-heart",
    backgroundColor: "#FF1493",
  },
  {
    name: "Events",
    icon: "calendar-outline",
    backgroundColor: "#4682B4",
  },
  {
    name: "Projects",
    icon: "clipboard-list-outline",
    backgroundColor: "#2E8B57",
  },
  {
    name: "Meetings",
    icon: "video-outline",
    backgroundColor: "#8B008B",
  },
];
const TAGS = [
  "urgent",
  "important",
  "can-wait",
  "meeting",
  "followup",
  "review",
];

const ASSIGNEE = [
  "John Doe",
  "Jane Smith",
  "Bob Johnson",
  "Alice Brown",
  "Charlie Wilson",
];

export const TASKS = Array.from({ length: 30 }, (_, index) => {
  const created = generateRandomDate(new Date(2024, 0, 1), new Date());
  const updated = generateRandomDate(created, new Date());
  const at = generateRandomDate(new Date(), new Date(2024, 11, 31));

  return {
    id: index + 1,
    title: `Task ${index + 1}`,
    description: `This is a detailed description for task ${
      index + 1
    }. It includes important information about what needs to be done.`,
    created_at: created.toISOString(),
    updated_at: updated.toISOString(),
    due_date: at.toISOString(), // scheduled datetime
    is_completed: Math.random() > 0.7, // 30% chance of being completed
    flag: getValue(FLAGS),
    category: getValue(CATEGORIES),
    tags: Array.from(
      { length: Math.floor(Math.random() * TAGS.length) + 1 },
      () => getValue(TAGS)
    ),
    reminder: Math.random() > 0.5, // 50% chance of having a reminder
    notes: `Additional notes for task ${index + 1}`,
    subtasks: Array.from(
      { length: Math.floor(Math.random() * 3) },
      (_, subIndex) => ({
        id: `${index + 1}-${subIndex + 1}`,
        title: `Subtask ${subIndex + 1}`,
        is_completed: Math.random() > 0.5,
      })
    ),
    assignee:
      Math.random() > 0.7
        ? {
            id: Math.floor(Math.random() * ASSIGNEE.length) + 1,
            name: getValue(ASSIGNEE),
          }
        : null,
  };
});
