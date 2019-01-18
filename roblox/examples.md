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


## DeleteAsync Example
