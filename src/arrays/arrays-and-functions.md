# Arrays and Functions

## Value Semantics

Arrays are passed by copy. The function receives its own copy — the caller's array is not affected:

```inference
fn modify_copy(mut arr: [i32; 3]) -> i32 {
    arr[0] = 99;
    return arr[0];
}

pub fn original_unchanged() -> i32 {
    let data: [i32; 3] = [1, 2, 3];
    let ignored: i32 = modify_copy(data);
    return data[0];  // returns 1, not 99
}
```
Here, `mut` attributes the function parameter so that `arr` can be modified within the function. However, this does not affect the caller's `data` array, which remains unchanged.

## Returning Arrays

Functions can return fixed-size arrays:

```inference
pub fn make_sequence() -> [i32; 3] {
    return [10, 20, 30];
}

pub fn use_sequence() -> i32 {
    let arr: [i32; 3] = make_sequence();
    return arr[1];
}
```

Array return values must be assigned to a variable first — `make_sequence()[0]` is not supported.
