#!/usr/bin/python3
""" FIFOCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.FIFO_items = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            self.FIFO_items.append(key) if key not in self.FIFO_items else None
            if len(self.FIFO_items) > self.MAX_ITEMS:
                self.cache_data.pop(self.FIFO_items[0])
                print(f'DISCARD: {self.FIFO_items[0]}')
                self.FIFO_items.pop(0)
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data[key] if key and key in self.cache_data else None
