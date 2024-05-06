#!/usr/bin/env python3
'''Defines a module with a function that return a tuple
   containing a start index and an end index '''


def index_range(page: int, page_size: int) -> tuple:
    ''' return a tuple containing a start index and an end index
    for querying the api

    Args:
        page (int): page number
        page_size (int): size of page to return

    returns:
        tuple: tuple with a start and end indexes
    '''
    end = page_size * page
    start = end - page_size
    return (start, end)
