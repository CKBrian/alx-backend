#!/usr/bin/python3
""" LIFOCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.LIFO_items = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if key not in self.LIFO_items:
                self.LIFO_items.append(key)
            else:
                index = self.LIFO_items.index(key)
                self.LIFO_items.pop(index)
                self.LIFO_items.append(key)
            if len(self.LIFO_items) > self.MAX_ITEMS:
                self.cache_data.pop(self.LIFO_items[-2])
                print(f'DISCARD: {self.LIFO_items[-2]}')
                self.LIFO_items.pop(-2)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data[key] if key and key in self.cache_data else None
