def findDuplicates(t):
	d,duplicates={},[]
	for i in t:
		d[i]=1 if i not in d.keys() else d[i]+1
		duplicates.append(i) if d[i]>1 else None
	return duplicates

print(findDuplicates( (1,1,2,3,4,5,8,9,4 ) ) )
