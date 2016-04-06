import sys, json

global length
length = 0
def similarity(s1,s2,aligntype):
    s1Len = (len(s1))+1
    s2Len = (len(s2)) +1
    #print(s1Len)
    #print(s2Len)

    array = [[0 for x in range(s1Len)] for y in range(s2Len)]
    for x in range(s1Len):
        array[0][x] = x * aligntype

    for y in range(s2Len):
        #print(y)
        array[y][0] = y * aligntype


    for x in range(1,s1Len):
        for y in range(1,s2Len):
            if s1[x-1] == s2[y-1]: #and x != 0 or y != 0:5
                p = 1
            else:
                p = -1
            array[y][x] = max((array[y-1][x] + g),(array[y][x-1] + g),(array[y-1][x-1] + p))

    return(array)


# dnaFileName1 = input("Enter the DNA File 1 Name:")
# dnaFileName2 = input("Enter the DNA File 2 Name:")
g = -1

s1='CDFGHC'
s2='CDEFGAHC'
length = 0
# with open(dnaFileName1) as dnaFile:
#     next(dnaFile)
#     for line in dnaFile:
#         s1 = line
# with open(dnaFileName2) as dnaFile:
#     next(dnaFile)
#     for line in dnaFile:
#         s2 =line
#print(s1 + s2)
s2 = s2.strip()
s1 = s1.strip()
aligns = s1
alignt= s2
aligntype = 'G'
# while not aligntype == 'G' or aligntype == 'S':
#     aligntype = input("Enter G for global or S for semi-globl:")
#     if aligntype == "G" or aligntype == "S":       # If it is a blank line...
#         break
if aligntype == 'G':
    aligntype = -2
else:
    aligntype = 0
a = similarity(s1,s2,aligntype)

# for row in a:
#      #Loop over columns.
#
#     for column in row:
#         print(column, end="  ")
#
#     print(end="|\n\n")
i = len(s1)
j = len(s2)


# align(n-2,m-2,n,m,aligns,alignt)
while i > 0 and j > 0:
    if s1[i-1] == s2[j-1]:
        p = 1
    else:
        p = -1
    if j > 0 and a[j][i] == a[j-1][i] + g:
        j = j - 1
        aligns = aligns[:j] + '-' + aligns[j:]
        #print("up")
    elif i > 0 and j > 0 and a[j][i] == a[j-1][i-1] + p:
       # print("diag")
        j = j - 1
        i = i - 1
    else:
       # print("left")
        i = i - 1
        alignt = alignt[:i] + '-' + alignt[i:]

print(aligns)
print(alignt)
#
#
# def align(i,j,m,n,aligns,alignt):
#     while i != 0 and j != 0:
#
#
#         if s1[i] == s2[j]:
#             p = 1
#         else:
#             p = -1
#
#         if i > 0 and a[j][i] == a[j-1][i] + g:
#             j - 1
#             aligns = aligns[:j] + '-' + aligns[j:]
#             print("yes")
#         elif i > 0 and j > 0 and a[j][i] == a[j-1][i-1] + p:
#
#             j = j - 1
#             i = i - 1
#         else:
#             i = i - 1
#             alignt = alignt[:i] + '-' + alignt[i:]
#
#         return print(aligns + alignt)
