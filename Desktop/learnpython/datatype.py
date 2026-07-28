# how many datatype in python you know?
# int, float, str, list, tuple, dict, set, bool, NoneType, complex
'''type(10) # int
type(10.5) # float
type("Hello") # str
type([1, 2, 3]) # list
type((1, 2, 3)) # tuple
type({"key": "value"}) # dict
type({1, 2, 3}) # set
type(True) # bool
type(None) # NoneType
type(1 + 2j) # complex     '''


'''a =83
b = 3.14
c = "Hello, World!"
d = [1, 2, 3, 4, 5]
e = (1, 2, 3)
f = {"name": "Alice", "age": 30}
g = {1, 2, 3, 4, 5}
h = True
i = None
j = 2 + 3j
print(type(a))  # int
print(type(b))  # float 
print(type(c))  # str
print(type(d))  # list
print(type(e))  # tuple
print(type(f))  # dict
print(type(g))  # set
print(type(h))  # bool
print(type(i))  # NoneType
print(type(j))  # complex '''


# int + str= int
'''a=53
b='34'
c=a+int(b)
print(c) '''

# str to int and float
'''b="34"
c='78'
print(int(b)+int(c))
print(float(b)+float(c))

# str + str = str
d='3'
e=str(7)
print(str(d)+e)'''

# type conversion functions
int() # convert to integer
float() # convert to float      
str() # convert to string
list() # convert to list
tuple() # convert to tuple
dict() # convert to dictionary
set() # convert to set
bool() # convert to boolean
complex() # convert to complex number

# number system
'''print(bin(10)) # binary
print(oct(10)) # octal  
print(hex(10)) # hexadecimal    
print(int('1010', 2)) # binary to decimal
print(int('12', 8)) # octal to decimal
print(int('A', 16)) # hexadecimal to decimal
print(int('1010', 2)) # binary to decimal
print(int('12', 8)) # octal to decimal
print(int('A', 16)) # hexadecimal to decimal    
print(int('FF', 16)) # hexadecimal to decimal
print(int('1001', 2)) # binary to decimal
print(int('77', 8)) # octal to decimal
print(int('1A', 16)) # hexadecimal to decimal
print(int('255', 10)) # decimal to decimal
print(int('100', 10)) # decimal to decimal '''

#binary 0,1
#octal 0-7
#decimal 0-9    
#hexadecimal 0-9,A-F

'''a=25
b=bin(a)
c=oct(a)
d=hex(a)
print(b)
print(c)
print(d)'''

'''e=0b1110101
f=0o31
g=0x1A5
print((e))
print((f))
print((g))'''

# unicode
a='a'
print(ord(a))
print(chr(97))