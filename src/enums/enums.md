# Enums

An enum defines a type with a fixed set of named variants.

## Defining an Enum

```inference
enum Direction {
    North,
    South,
    East,
    West
}
```

`pub enum` exports the type from the module. Variants are comma-separated. Each enum is a distinct type.

## Using Enum Values

Variants are accessed with `::`:

```inference
pub fn go_west() -> Direction {
    let d: Direction = Direction::West;
    return d;
}
```

## Comparing Enums

Enums support `==` and `!=`. Ordering operators (`<`, `>`, `<=`, `>=`) are not supported.

```inference
enum Status { Active, Inactive }

pub fn is_active(s: Status) -> bool {
    return s == Status::Active;
}

pub fn are_not_equal(a: Status, b: Status) -> bool {
    return a != b;
}
```

## Enums and Functions

Enums work as function parameters and return types like any other type:

```inference
enum Dir { Up, Down, Left, Right }

pub fn dir_to_int(d: Dir) -> i32 {
    if d == Dir::Up {
        return 10;
    }
    if d == Dir::Down {
        return 20;
    }
    if d == Dir::Left {
        return 30;
    }
    return 40;
}
```

## Reassignment

Enum variables declared with `let mut` can be reassigned:

```inference
enum Color { Red, Green, Blue }

pub fn reassign() -> Color {
    let mut c: Color = Color::Red;
    c = Color::Blue;
    return c;
}
```

## Enums in Arrays

```inference
enum Color { Red, Green, Blue }

pub fn second_color() -> i32 {
    let colors: [Color; 3] = [Color::Red, Color::Green, Color::Blue];
    if colors[1] == Color::Green {
        return 1;
    }
    return 0;
}
```

## Enums in Structs

Enum types can be used as struct fields:

```inference
enum Status { Active, Inactive }

struct Item {
    status: Status;
    value: i32;
}

pub fn get_status() -> i32 {
    let item: Item = Item { status: Status::Inactive, value: 42 };
    if item.status == Status::Inactive {
        return 1;
    }
    return 0;
}
```

> [!Note]
> Enums do not support data-carrying variants, explicit discriminant values, methods, or pattern matching. They are simple named constants grouped under a type for better code organization and readability.
