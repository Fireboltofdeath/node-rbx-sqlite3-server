## GetAsync Example

```lua
sql:GetAsync("table1example", "Table 1 key", function(Success, Value, ServerResponse)
	if (Success) then
		-- Value is 'Table 1 key's value or nil, if it doesn't exist.
	else
		-- Value is the error message, however ServerResponse will contain more detailed information.
	end
end)
```

## PostAsync Example

```lua
sql:PostAsync("table1example", "Table 1 key", "New Value", function(Success, Value, ServerResponse)
	if (Success) then
		-- Value is ServerResponse, and third argument is null.
	else
		-- Value is Error Message, and third argument is Server Response. (Server Response gives more detailed information about an error)
	end
end)
```

## DeleteAsync Example

```lua
sql:DeleteAsync("table1example", "Table 1 key", function(Success, Value, ServerResponse)
	if (Success) then
		-- Value is ServerResponse, and third argument is null.
	else
		-- Value is Error Message, and third argument is Server Response. (Server Response gives more detailed information about an error)
	end
end)
```
