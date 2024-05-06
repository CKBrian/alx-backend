# 0x00-pagination
# Pagination Project

## Learning Objectives

At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to paginate a dataset with simple page and page_size parameters
- How to paginate a dataset with hypermedia metadata
- How to paginate in a deletion-resilient manner

## Requirements

- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
- All your files should end with a new line
- The first line of all your files should be exactly `#!/usr/bin/env python3`
- A README.md file, at the root of the folder of the project, is mandatory

## Tasks

### Task 0: Simple Helper Function

Write a function named `index_range` that takes two integer arguments `page` and `page_size`.

The function should return a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters.

Page numbers are 1-indexed, i.e. the first page is page 1.

### Task 1: Simple Pagination

Implement a method named `get_page` that takes two integer arguments `page` with default value 1 and `page_size` with default value 10.

Use `index_range` to find the correct indexes to paginate the dataset correctly and return the appropriate page of the dataset (i.e. the correct list of rows).

If the input arguments are out of range for the dataset, an empty list should be returned.

### Task 2: Hypermedia Pagination

Replicate code from Task 1.

Implement a `get_hyper` method that takes the same arguments (and defaults) as `get_page` and returns a dictionary containing the following key-value pairs:

- `page_size`: the length of the returned dataset page
- `page`: the current page number
- `data`: the dataset page
- `next_page`: number of the next page, None if no next page
- `prev_page`: number of the previous page, None if no previous page
- `total_pages`: the total number of pages in the dataset as an integer

Make sure to reuse `get_page` in your implementation.

### Task 3: Deletion-Resilient Hypermedia Pagination

Implement a `get_hyper_index` method with two integer arguments: `index` with a None default value and `page_size` with default value of 10.

The method should return a dictionary with the following key-value pairs:

- `index`: the current start index of the return page
- `next_index`: the next index to query with
- `page_size`: the current page size
- `data`: the actual page of the dataset

Use assert to verify that index is in a valid range.

If the user queries index 0, page_size 10, they will get rows indexed 0 to 9 included.

If they request the next index (10) with page_size 10, but rows 3, 6, and 7 were deleted, the user should still receive rows indexed 10 to 19 included.

